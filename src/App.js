import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./App.css";
import { FiSend } from "react-icons/fi";
import { GiOfficeChair } from "react-icons/gi"; // Import a chair icon from React Icons
import { motion } from "framer-motion"; // Import Framer Motion for animation
import renderMessage from "./renderMessage"; // Import the renderMessage function
import OrderForm from "./orderHandler";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const [isChairUpright, setIsChairUpright] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null); // Define selectedProductID state

  const handleBuyNowClick = (message) => {
    console.log("message", message);
    setSelectedProductID(message);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOrderSuccess = ({
    confirmationId,
    productId,
    productName,
    productPrice,
  }) => {
    const confirmationMessage = {
      type: "confirmation",
      confirmationId: confirmationId,
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      sender: "bot",
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const initialMessage = {
      text: "Hello! I'm the ChairBot, your personal assistant. How can I help you today with furniture solutions?",
      sender: "bot",
      time: getCurrentTime(),
    };
    setMessages([initialMessage]);
    // Trigger the chair fall animation after 1 second
    setTimeout(() => {
      setIsChairUpright(true); // The chair will become upright after falling
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = {
      text: userInput,
      sender: "user",
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/ask/", {
        message: userInput,
      });

      if (response.data.type === "reply") {
        const botMessage = {
          text: response.data.message,
          sender: "bot",
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, botMessage]);
        console.log(botMessage);
      } else if (response.data.type === "product") {
        const productMessages = response.data.products.map((product) => ({
          type: "product",
          name: product.name,
          chair_type: product.chair_type,
          price: product.price,
          description: product.description,
          discount: product.discount,
          image: product.image, // Use the image URL directly
          sender: "bot",
          time: getCurrentTime(),
          id: product.id,
        }));
        setMessages((prev) => [...prev, ...productMessages]);
      } else if (response.data.type === "types") {
        const typesMessage = {
          type: "types",
          chair_types: response.data.chair_types,
          sender: "bot",
          time: getCurrentTime(),
        };
        setMessages((prev) => [...prev, typesMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false even if the API call fails
    }
  };

  return (
    <div className="chat-container">
      <motion.div
        className="chair-animation"
        initial={{ y: -200, rotate: -90 }} // Start position: above and rotated
        animate={{
          y: isChairUpright ? 0 : -200, // End position: aligned with headline
          rotate: isChairUpright ? 0 : -90, // Rotate back to upright
        }}
        transition={{ duration: 2, ease: "easeOut" }} // Smooth transition with ease-out effect
      >
        <GiOfficeChair size={60} color="#4caf50" /> {/* Chair icon */}
      </motion.div>

      <h1 style={{ textAlign: "center" }}>ChairBot</h1>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index}>{renderMessage(msg, handleBuyNowClick)}</div>
        ))}
        {loading && <div className="message bot loading">Loading...</div>}
      </div>

      {showForm && (
        <OrderForm
          onClose={handleCloseForm}
          onOrderSuccess={handleOrderSuccess}
          product={selectedProductID}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit">
          <FiSend size={24} color="#4caf50" />
        </button>
      </form>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import { FiSend } from 'react-icons/fi';
import { GiOfficeChair } from 'react-icons/gi'; // Import a chair icon from React Icons
import { motion } from 'framer-motion'; // Import Framer Motion for animation
import renderMessage from './renderMessage'; // Import the renderMessage function

const OrderForm = ({ onClose, onOrderSuccess, productID }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    productId: productID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('formData:', formData);
      const response = await axios.post('http://localhost:8000/api/order/', formData);
      console.log('response:', response);
      if (response.status === 200) {

        const { confirmationId, productId, productName, productPrice } = response.data;
        onOrderSuccess({ confirmationId, productId, productName, productPrice });
        onClose();
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
        <div className="modal">
      <div className="modal-content">
        <h2>Confirm Your Order</h2>
        <form id="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              pattern="[A-Za-z0-9]{5}" // Ensure the pincode is exactly 6 alphanumeric characters
              title="Pincode must be exactly 6 alphanumeric characters"
            />
          </div>
          <div className="form-group">
            <label>Credit Card Number:</label>
            <input
              type="text"
              name="creditCardNumber"
              value={formData.creditCardNumber}
              onChange={handleChange}
              required
              pattern="\d{12}" // Ensure the credit card number is exactly 12 digits with hyphens
              title="Credit Card Number must be in the format XXXX-XXXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label>Credit Card Expiry (MM/YY):</label>
            <input
              type="month"
              name="creditCardExpiry"
              value={formData.creditCardExpiry}
              onChange={handleChange}
              required
              min={new Date().toISOString().slice(0, 7)} // Ensure the expiry date is greater than today's date
              title="Credit Card Expiry must be greater than today's date"
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const [isChairUpright, setIsChairUpright] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null); // Define selectedProductID state

  const handleBuyNowClick = (productID) => {
    console.log('Product ID:', productID);
    setSelectedProductID(productID);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOrderSuccess = ({ confirmationId, productId, productName, productPrice }) => {
    const confirmationMessage = {
      type: 'confirmation',
      confirmationId: confirmationId,
      productId: productId,
      productName: productName,
      productPrice: productPrice,
      sender: 'bot',
      time: getCurrentTime()
    };
    setMessages((prev) => [...prev, confirmationMessage]);
  };

  const getCurrentTime = () => {
    const date = new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const initialMessage = { text: "Hello! I'm the ChairBot, your personal assistant. How can I help you today with furniture solutions?", sender: 'bot', time: getCurrentTime() };
    setMessages([initialMessage]);
    // Trigger the chair fall animation after 1 second
    setTimeout(() => {
      setIsChairUpright(true); // The chair will become upright after falling
    }, 1000);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

        useEffect(() => {
        if (messages.length > 0) {
          let productID = null;
          for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].type === 'product') {
              productID = messages[i].productId;
              break;
            }
          }
      
          const buyNowButtons = document.querySelectorAll('.buy-now-button');
          buyNowButtons.forEach((button) => {
            const clonedButton = button.cloneNode(true);
            button.parentNode.replaceChild(clonedButton, button);
            clonedButton.addEventListener('click', () => handleBuyNowClick(productID)); // Pass productID to event handler
          });
        }
      }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessage = { text: userInput, sender: 'user', time: getCurrentTime() };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/chatbot/', { message: userInput });
      
      if (response.data.type === 'reply') {
        const botMessage = { text: response.data.text, sender: 'bot', time: getCurrentTime() };
        setMessages((prev) => [...prev, botMessage]);
      } else if (response.data.type === 'product') {
        const productMessage = {
          type: 'product',
          name: response.data['product-name'],
          productType: response.data['product-type'],
          price: response.data['price'],
          description: response.data['description'],
          image: `data:image/png;base64,${response.data.image}`,
          sender: 'bot',
          time: getCurrentTime(),
          productId: response.data['product-id']
        };
        setMessages((prev) => [...prev, productMessage]);
      }

    } catch (error) {
      console.error('Error:', error);
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
          rotate: isChairUpright ? 0 : -90 // Rotate back to upright
        }}
        transition={{ duration: 2, ease: 'easeOut' }} // Smooth transition with ease-out effect
      >
        <GiOfficeChair size={60} color="#4caf50" /> {/* Chair icon */}
      </motion.div>

      <h1 style={{ textAlign: 'center' }}>ChairBot</h1>

      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div key={index}>
            {renderMessage(msg)}
          </div>
        ))}
        {loading && <div className="message bot loading">Loading...</div>}
      </div>

      {showForm && (
        <OrderForm
          onClose={handleCloseForm}
          onOrderSuccess={handleOrderSuccess}
          productID={selectedProductID}
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
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lounge.css";

const Gaming = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/gaming");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="gaming-container">
      <h2>Gaming Chairs</h2>
      <div className="gaming-items">
        {items.map((item) => (
          <div key={item.id} className="gaming-item">
            <img src={item.image} alt={item.name} className="gaming-item-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {item.discount > 0 && <p>Discount: {item.discount}%</p>}
            <p>Rebate: {item.has_rebate ? "Available" : "Not Available"}</p>
            <center><button className="buy-now-button">Buy Now</button></center>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gaming;
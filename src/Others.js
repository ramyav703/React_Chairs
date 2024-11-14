import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lounge.css";

const Others = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/others");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="others-container">
      <h1>Others</h1>
      <div className="others-items">
        {items.map((item) => (
          <div key={item.id} className="others-item">
            <img src={item.image} alt={item.name} className="others-item-image" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            {item.discount && <p>Discount: {item.discount}%</p>}
            {item.has_rebate && <p>Rebate Available</p>}
            <p>Type: {item.chair_type}</p>
            <button className="buy-now-button">Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Others;
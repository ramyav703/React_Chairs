import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Lounge.css";

const Lounge = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://your-backend-server/api/lounge");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="lounge-container">
      <h1>Lounge</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.element}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lounge;
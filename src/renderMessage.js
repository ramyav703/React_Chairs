import React from 'react';
import './App.css';
import './orderHandler'; // Import the orderHandler.js file

const renderMessage = (message) => {
  if (message.type === 'product') {
    return (
      <div className="message bot">
        <img src={message.image} alt="Product Image" />
        <h3><strong>Name:</strong> {message.name}</h3>
        <h3><strong>Type:</strong> {message.productType}</h3>
        <h3><strong>Price:</strong> {message.price}</h3>
        <h3><strong>Description:</strong> {message.description}</h3>
        <button className="buy-now-button" data-product-id={message.product_Id}>Buy Now</button>
        <span className="message-time">{message.time}</span>
      </div>
    );
  } else if (message.type === 'confirmation') {
    return (
            <div className="message bot confirmation-message">
        <h2>🎉<strong>Your Order has been confirmed</strong></h2>
        <h3>Order Confirmation:</h3>
        <h3>Confirmation ID: {message.confirmationId}</h3>
        <h3>Product ID: {message.productId}</h3>
        <h3>Product Name: {message.productName}</h3>
        <h3>Product Price: {message.productPrice}</h3>
        <span className="message-time">{message.time}</span>
      </div>
    );
  } else {
    return (
      <div className={`message ${message.sender}`}>
        <div className="message-text">{message.text}</div>
        <br></br>
        <br></br> 
        <span className="message-time">{message.time}</span>
      </div>
    );
  }
};

export default renderMessage;
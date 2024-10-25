import React, { useState } from 'react';
import axios from 'axios';
import './App.css';



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

export default OrderForm;
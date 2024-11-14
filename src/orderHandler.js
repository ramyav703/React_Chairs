import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const OrderForm = ({ onClose, onOrderSuccess, product }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    shipping_address: "",
    zip_code: "",
    card_number: "",
    card_exp: "",
    id: product.id,
    price: product.price,
    description: product.description,
    name: product.name,
    image: product.image,
    discount: product.discount,
    has_rebate: product.has_rebate,
    chair_type: product.chair_type,
    cvv: 123,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let cardExp = formData["card_exp"];

      const [year, month] = cardExp.split("-");
      console.log("year:", year);
      cardExp = `${month}/${year.slice(2)}`;

      formData["card_exp"] = cardExp;

      // Format the input as MM/YY
      if (cardExp.length >= 3) {
        cardExp = cardExp.slice(0, 2) + "/" + cardExp.slice(2, 4);
      }

      console.log(formData["card_exp"]);
      console.log("formData:", formData);
      const response = await axios.post(
        "http://localhost:8000/api/order/",
        formData
      );
      console.log("response:", response);
      if (response.status === 200) {
        const data = response.data.order;
        const requiredJson = {
          confirmationId: data.order_number,
          productId: data.id,
          productName: data.name,
          productPrice: data.price,
        };
        console.log(requiredJson);
        onOrderSuccess(requiredJson);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Your Order</h2>
        <form id="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pincode:</label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
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
              name="card_number"
              value={formData.card_number}
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
              name="card_exp"
              value={formData.card_exp}
              onChange={handleChange}
              required
              min={new Date().toISOString().slice(0, 7)} // Ensure the expiry date is greater than today's date
              title="Credit Card Expiry must be greater than today's date"
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

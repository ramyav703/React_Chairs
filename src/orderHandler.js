// import React, { useState } from 'react';
// import axios from 'axios';


// const OrderForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     pincode: '',
//     creditCardNumber: '',
//     creditCardExpiry: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         console.log('formData:', formData);
//       const response = await axios.post('http://localhost:8000/api/order/', formData);
//       console.log('response:', response);
//       if (response.status === 200) {
//         const { confirmationId, productId, productName, productPrice } = response.data;
//         handleOrderSuccess ({ confirmationId, productId, productName, productPrice });
//         alert('Order submitted successfully!');
//         onClose();
//       }
//     } catch (error) {
//       console.error('Error submitting order:', error);
//       alert('Failed to submit order.');
//     }
//   };
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Confirm Your Order</h2>
//         <form id="order-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Name:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Address:</label>
//             <input type="text" name="address" value={formData.address} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Pincode:</label>
//             <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Credit Card Number:</label>
//             <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} required />
//           </div>
//           <div className="form-group">
//             <label>Credit Card Expiry (MM/YY):</label>
//             <input
//               type="month"
//               name="creditCardExpiry"
//               value={formData.creditCardExpiry}
//               onChange={handleChange}
//               required
//               pattern="\d{4}-\d{2}" // Ensure the format is YYYY-MM
//             />
//           </div>
//           <button type="submit">Submit</button>
//           <button type="button" onClick={onClose}>Cancel</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OrderForm;
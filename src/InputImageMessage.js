import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios'

const InputImageMessage = ({ message }) => {
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);

  const handleUploadClick = () => {
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('order_number', message.order_number);
    formData.append('query', message.query)
    formData.append('document', file);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setShowForm(false);
  };

  const closeModal = () => {
    setShowForm(false);
  };

  return (
    <div className="message bot input-image-message">
      <p>{message.text}</p>
      <button
        className="upload-button"
        data-order-number={message.order_number}
        onClick={handleUploadClick}
      >
        Upload Document
      </button>
      <Modal
        isOpen={showForm}
        onRequestClose={closeModal}
        contentLabel="File Upload"
        className="upload-modal"
        overlayClassName="upload-modal-overlay"
      >
        <h2>Upload Document</h2>
        <p><strong>Order Number:</strong> {message.order_number}</p>
        <form className="upload-form" onSubmit={handleSubmit}>
          <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
        <button className="close-button" onClick={closeModal}>Close</button>
      </Modal>
      <span className="message-time">{message.time}</span>
    </div>
  );
};

export default InputImageMessage;
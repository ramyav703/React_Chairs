import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="chair-photo">
        <img src="Home_image.png" alt="Chair" />
      </div>
      <div className="content">
        <h1>Welcome to Chair Couture - Stylish, emphasizing designer chairs. </h1>
        <p>Your one-stop shop for all types of chairs.</p>
        <p>Where elegant design meets top functionality. Discover our wide range of chairs that combine style and comfort to enhance your living space.</p>
      </div>
    </div>
  );
};

export default Home;
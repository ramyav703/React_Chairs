import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Chair & Co.</h1>
      <p>Your one-stop shop for all types of chairs.</p>
      
      <div className="chair-photo">
        <img src="Home_image.png" alt="Chair" />
      </div>
      <p>Where elegant design meets top functionality. Discover our wide range of chairs that combine style and comfort to enhance your living space.</p>

    </div>
  );
};

export default Home;
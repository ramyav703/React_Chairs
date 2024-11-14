import React, { useState } from "react";
import "./App.css";
import { GiOfficeChair } from "react-icons/gi";
import Chat from "./Chat";
import Home from "./Home";
import Lounge from "./Lounge"; // Import Lounge component

const App = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Lounge":
        return <Lounge />; // Render Lounge component
      // Add cases for other pages here
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Chair& Co.</h1>
        <nav>
          <ul>
            <li onClick={() => setActivePage("Home")}>Home</li>
            <li onClick={() => setActivePage("Lounge")}>Lounge</li>
            <li onClick={() => setActivePage("Recliner")}>Recliner</li>
            <li onClick={() => setActivePage("Patio")}>Patio</li>
            <li onClick={() => setActivePage("Gaming")}>Gaming</li>
            <li onClick={() => setActivePage("Others")}>Others</li>
            <li onClick={() => setActivePage("Carts")}>Carts</li>
          </ul>
        </nav>
      </header>
      <main>
        {renderPage()}
      </main>
      {!isChatVisible ? (
        <button className="minimized-button" onClick={() => setIsChatVisible(true)}>
          <GiOfficeChair size={30} color="#4caf50" />
          <span>Chat with ChairBot</span>
        </button>
      ) : (
        <Chat isChatVisible={isChatVisible} setIsChatVisible={setIsChatVisible} />
      )}
    </div>
  );
};

export default App;
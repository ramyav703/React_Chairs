import React, { useState } from "react";
import "./App.css";
import { GiOfficeChair } from "react-icons/gi";
import Chat from "./Chat";
import Home from "./Home";
import Lounge from "./Lounge";
import Recliner from "./Recliner";
import Patio from "./Patio";
import Gaming from "./Gaming";
import Others from "./Others";

const App = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Lounge":
        return <Lounge />;
      case "Recliner":
        return <Recliner />;
      case "Patio":
        return <Patio />;
      case "Gaming":
        return <Gaming />;
      case "Others":
        return <Others />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Chair & Co.</h1>
        <nav>
          <ul>
            <li onClick={() => setActivePage("Home")}>Home</li>
            <li onClick={() => setActivePage("Lounge")}>Lounge</li>
            <li onClick={() => setActivePage("Recliner")}>Recliner</li>
            <li onClick={() => setActivePage("Patio")}>Patio</li>
            <li onClick={() => setActivePage("Gaming")}>Gaming</li>
            <li onClick={() => setActivePage("Others")}>Others</li>
            <li onClick={() => setActivePage("Cart")}>Cart</li>
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
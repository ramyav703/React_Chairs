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
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Office from "./Office";

const App = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [activePage, setActivePage] = useState("SignIn");

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return <Home />;
      case "Lounge":
        return <Lounge />;
      case "Office":
        return <Office />;
      case "Recliner":
        return <Recliner />;
      case "Patio":
        return <Patio />;
      case "Gaming":
        return <Gaming />;
      case "Others":
        return <Others />;
      case "SignIn":
        return <SignIn setActivePage={setActivePage} />;
      case "SignUp":
        return <SignUp setActivePage={setActivePage} />;
      default:
        return <SignIn setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Chair Couture</h1>
        <nav>
          <ul>
            <li className={activePage === "Home" ? "active" : ""} onClick={() => setActivePage("Home")}>Home</li>
            <li className={activePage === "Lounge" ? "active" : ""} onClick={() => setActivePage("Lounge")}>Lounge</li>
            <li className={activePage === "Office" ? "active" : ""} onClick={() => setActivePage("Office")}>Office</li>
            <li className={activePage === "Recliner" ? "active" : ""} onClick={() => setActivePage("Recliner")}>Recliner</li>
            <li className={activePage === "Patio" ? "active" : ""} onClick={() => setActivePage("Patio")}>Patio</li>
            <li className={activePage === "Gaming" ? "active" : ""} onClick={() => setActivePage("Gaming")}>Gaming</li>
            <li className={activePage === "Others" ? "active" : ""} onClick={() => setActivePage("Others")}>Others</li>
            {activePage === "SignIn" && (
              <li onClick={() => setActivePage("SignUp")}>Sign Up</li>
            )}
            {activePage !== "SignIn" && activePage !== "SignUp" && (
              <li onClick={() => setActivePage("SignIn")}>Logout</li>
            )}
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
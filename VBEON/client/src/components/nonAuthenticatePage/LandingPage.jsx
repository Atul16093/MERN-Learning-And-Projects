import React, { useState } from "react";
import ROBOSVG from "../../assets/FloatingRobo.svg";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  //Navigate to Assistant Page 

  const signUp = ()=>{
    navigate("/emo")
  }
  return (
    <>
      <div className="landing-container">
        <nav className="navbar">
          <div className="logo">LOGO</div>

          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-links ${menuActive ? "active" : ""}`}>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Login</li>
            <li className="signup">Sign up</li>
          </ul>
        </nav>

        <div className="hero-section">
          <h1>Chat Beyond Limits</h1>
          <p>
            Create your space. Build servers, add channels, and chat without
            limits. Your community, your rules.
          </p>
          <button onClick={signUp} className="glow-button glowMove"><span className="increase-index">Getting Started</span></button>
        </div>
        <img src={ROBOSVG} alt="Chatbot" className="floating-robot" />
        <footer className="d-flex justify-content-between">
          <p>© 2025 VBEON. All rights reserved.</p>
          <p>Made with ❤️ for seamless conversations.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;

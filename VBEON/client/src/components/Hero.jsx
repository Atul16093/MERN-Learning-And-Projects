import "./Hero.css"
import minimize from "../assets/Vector.svg"
import React, { useState } from "react";
// Placeholder images/icons
const SERVER_ICON = "https://via.placeholder.com/40/ffffff/000000?text=S";
const USER_AVATAR = "https://via.placeholder.com/40/ffffff/000000?text=U";

const Hero = () => {
    const [isHidden , setIsHidden] = useState(false);

    const min = ()=>{
          setIsHidden(!isHidden);
    }
  return <>
    <div className="dashboard">
      {/* SERVER LIST (Far Left) */}
      <nav className="server-list">
        <ul>
          <li onClick={min} className="server-icon home-icon">🏠</li>
          <li className="server-icon">
            <img src={SERVER_ICON} alt="Server 1" />
          </li>
          <li className="server-icon">
            <img src={SERVER_ICON} alt="Server 2" />
          </li>
          <li className="server-icon">
            <img src={SERVER_ICON} alt="Server 3" />
          </li>
          <li className="server-icon add-server">+</li>
        </ul>
      </nav>

      {/* SIDEBAR (Channels) */}
      <aside className={isHidden ? "minSidebar" :"sidebar"}>
        <div className="sidebar-header">
          <h1 className="logo">VBEON</h1>
          <h1><img className="minimize" onClick={min} src={minimize} alt="arrow" /></h1>
        </div>

        <div className="channels">
          <div className="channel-group">
            <h3>TEXT CHANNELS</h3>
            <ul>
              <li># general</li>
              <li># random</li>
              <li># announcements</li>
            </ul>
          </div>

          <div className="channel-group">
            <h3>VOICE CHANNELS</h3>
            <ul>
              <li>🐼 Lobby</li>
              <li>🐼 Gaming</li>
            </ul>
          </div>
        </div>

        <div className="user-info">
          <img src={USER_AVATAR} alt="User" />
          <div className="user-details">
            <p className="username">Username</p>
            <p className="status">Online</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT (Chat) */}
      <main className="main">
        {/* Channel Header */}
        <div className="channel-header">
          <h2># general</h2>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          <div className="messages">
            <p className="welcome-message">
              Welcome to the <strong>#general</strong> channel!
            </p>
            {/* More messages here */}
          </div>

          {/* Message Input */}
          <div className="chat-input">
            <input type="text" placeholder="Message..." />
          </div>
        </div>
      </main>
    </div>
  </>
};

export default Hero;

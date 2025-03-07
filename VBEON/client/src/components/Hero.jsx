import "./Hero.css"
import minimize from "../assets/Vector.svg"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import store from "../Redux/Redux";
// Placeholder images/icons
const Hero = () => {
    const [isHidden , setIsHidden] = useState(false);

    const serverData = useSelector((store)=>store.User );
    console.log("That's a server data " , serverData);
    
    const min = ()=>{
          setIsHidden(!isHidden);
    }
  return <>
    <div className="dashboard">
      {/* SERVER LIST (Far Left) */}
      <nav className="server-list">
        <ul>
          <li onClick={min} className="server-icon home-icon">🏠</li>
          {/* {serverData.user.servers.map((serve , index)=>{return <li onClick={()=>{}} className="server-icon" key={index}>{serve}</li>})}; */}
          {serverData.user.servers.}
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
          <img src={" "} alt="User" />
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

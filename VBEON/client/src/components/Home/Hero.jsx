import "./Hero.css"
import minimize from "../../assets/Vector.svg"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api.jsx"
import axios from "axios";
// Placeholder images/icons
const Hero = () => {
    const [isHidden , setIsHidden] = useState(false);

    const [channels , setChannels] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const serverData = useSelector((store)=>store.User );

    const min = ()=>{
          setIsHidden(!isHidden);
    }

    const handleServerClick = async (server)=>{
      setSelectedServer(server);
      try{
        let res = await axios.get(`${api.GET_CHANNEL}${server._id}`);

       if(Array.isArray(res.data.channelInfo)){
        setChannels(res.data.channelInfo);
       }else{
        setChannels([]);
       }
      }catch(err){
        console.log("Error fetching channels:", err);
        setChannels([]);
      }
      }
      
  return <>
    <div className="dashboard">
      {/* SERVER LIST (Far Left) */}
      <nav className="server-list">
        <ul>
          <li onClick={()=>{ setSelectedServer(null); min()}} className="server-icon home-icon">🏠</li>
          {serverData.user.servers.map((server , index)=>{return <button className="server-icon" key={index} onClick={()=>handleServerClick(server)}>{server.servername[0]}</button>})}
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
              {channels.map((channel , index)=>{
                return <li key={index}>  {channel.type == "text" ? `😊 ${channel.channelname}` : ""}
                </li>
              })}
            </ul>
          </div>

          <div className="channel-group">
            <h3>VOICE CHANNELS</h3>
            <ul>
             {channels.map((channel , index)=>{
              return <li key={index}> {channel.type == "voice" ? `🐼 ${channel.channelname}` : ""} </li>
             })}
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

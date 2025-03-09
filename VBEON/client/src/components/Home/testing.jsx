import "./Hero.css";
import minimize from "../../assets/Vector.svg";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api.jsx";
import axios from "axios";
import socket from "../../socket/SocketUrl.jsx";
import Login from "../nonAuthenticatePage/login.jsx";

const Hero = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const newMessageRef = useRef();

  const serverData = useSelector((store) => store.User);
  const user_id = serverData?.user?.id;

  // Connect user to socket
  useEffect(() => {
    if (user_id) {
      socket.emit("userConnected", user_id);
    }
  }, [user_id]);

  // Listen for new messages
  useEffect(() => {
    if (!selectedChannel) return;

    const handleMessage = (message) => {
      if (message.sender._id !== user_id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [selectedChannel, user_id]);

  const min = () => {
    setIsHidden(!isHidden);
  };

  const handleServerClick = async (server) => {
    setSelectedServer(server);
    setSelectedChannel(null);
    setMessages([]);

    try {
      const res = await axios.get(`${api.GET_CHANNEL}${server._id}`);
      setChannels(Array.isArray(res.data.channelInfo) ? res.data.channelInfo : []);
    } catch (err) {
      console.error("Error fetching channels:", err);
      setChannels([]);
    }
  };

  const handleChannelClick = async (channel) => {
    setSelectedChannel(channel);
    setMessages([]);

    try {
      const res = await axios.get(`${api.GET_MESSAGES}${channel._id}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }

    socket.emit("joinChannel", { channelId: channel._id, user_id });
  };

  const sendMessage = () => {
    if (!newMessageRef.current.value.trim() || !selectedChannel) return;

    const messageData = {
      sender: { _id: user_id, username: "You" },
      content: newMessageRef.current.value,
      channelId: selectedChannel._id,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    newMessageRef.current.value = "";
  };

  return (
    <div className="dashboard">
      {/* SERVER LIST */}
      <nav className="server-list">
        <ul>
          <li onClick={() => setSelectedServer(null)} className="server-icon home-icon">
            🏠
          </li>
          {serverData?.user?.servers?.map((server, index) => (
            <button
              className="server-icon"
              key={index}
              onClick={() => handleServerClick(server)}
            >
              {server.servername[0]}
            </button>
          ))}
        </ul>
      </nav>

      {/* SIDEBAR */}
      <aside className={isHidden ? "minSidebar" : "sidebar"}>
        <div className="sidebar-header">
          <h1 className="logo">VBEON</h1>
          <img className="minimize" onClick={min} src={minimize} alt="minimize" />
        </div>

        <div className="channels">
          <div className="channel-group">
            <h3>TEXT CHANNELS +</h3>
            <ul>
              {channels.map((channel, index) =>
                channel.type === "text" ? (
                  <li key={index} onClick={() => handleChannelClick(channel)}>
                    😊 {channel.channelname}
                  </li>
                ) : null
              )}
            </ul>
          </div>

          <div className="channel-group">
            <h3>VOICE CHANNELS</h3>
            <ul>
              {channels.map((channel, index) =>
                channel.type === "voice" ? (
                  <li key={index} onClick={() => handleChannelClick(channel)}>
                    🐼 {channel.channelname}
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      </aside>

      {/* CHAT AREA */}
      <main className="main">
        {selectedChannel ? (
          <>
            <div className="channel-header">
              <h2># {selectedChannel.channelname}</h2>
            </div>
            <div className="chat-area">
              <div className="messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message-container ${msg.sender._id === user_id ? "sent" : "received"}`}
                  >
                    <p className="message-username">{msg.sender.username}</p>
                    <div className="message-bubble">
                      <p className="message-text">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  ref={newMessageRef}
                  type="text"
                  placeholder="Message..."
                />
                <button onClick={sendMessage} className="send-btn">
                  &#x27A4;
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="select-channel-message">Select a channel to start chatting</p>
        )}
      </main>
    </div>
  );
};

export default Hero;

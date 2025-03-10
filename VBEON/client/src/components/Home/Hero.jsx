import "./Hero.css"
import minimize from "../../assets/Vector.svg"
import Plus from "../../assets/Plus.svg";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api.jsx"
import axios from "axios";
import socket from "../../socket/SocketUrl.jsx"
import CreateChannel from "./CreateChannel.jsx";
const Hero = () => {
    const [isHidden , setIsHidden] = useState(false);
    const [channels , setChannels] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages , setMessages] = useState([]);
    const serverData = useSelector((store)=>store.User ); 
    const user_id = serverData.user.id;
    const newMessageRef = useRef();
    const chatContainerRef = useRef(null);
    const [addChannelPopup , setAddChannelPopup] = useState(false)

    //Handle data from child 

    const handleDataFromChild = (data)=>{
          setAddChannelPopup(data);
    }
    //Setup the socket io...
    useEffect(()=>{
      socket.emit("userConnected" , user_id);
    },[user_id]);
    
    //This useEffect use for taking the container to current chat

    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);

    useEffect(()=>{ 
      if(!selectedChannel) return;
      
      const handleMessage = (message)=>{
       if(message.sender !== user_id){
          setMessages((prevMessages)=>[...prevMessages , message])
       }
      }
      socket.on("receiveMessage" , handleMessage);
      
      return () => {
        socket.off("receiveMessage", handleMessage); // Cleanup event listener
      };
    }, [selectedChannel, user_id]);

    const min = ()=>{
          setIsHidden(!isHidden);
    }

    const handleServerClick = async (server)=>{
      setSelectedServer(server);
      setSelectedChannel(null);
      setMessages([]);
      try{
        let res = await axios.get(`${api.GET_CHANNEL}${server._id}`);
        setChannels(Array.isArray(res.data.channelInfo) ? res.data.channelInfo : []);
      }catch(err){
        console.log("Error fetching channels:", err);
        setChannels([]);
      }
      }
      
      const handleChannelClick = async (channel) => {
            setSelectedChannel(channel); 
            setMessages([]);
            try{
            let res = await axios.get(`${api.GET_MESSAGES}${channel._id}`) 
            setMessages(res.data.messages || [])     
          }catch(err){
            console.log("error in handlechannel click", err);
          }
          socket.emit("joinChannel" , {channelId : channel._id , user_id});
          // setTimeout(()=>{
          //   if(chatContainerRef.current){
          //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          //   }
          // },300)
        };


    const sendMessage = ()=>{
      if(!newMessageRef.current.value.trim() || !selectedChannel) return ;

      const messageData = {
          sender :{ _id :user_id , username : serverData.user.username},
          content : newMessageRef.current.value, 
          channelId : selectedChannel._id,
      };
      
      socket.emit("sendMessage" , messageData);
      setMessages((prevMessages)=>[...prevMessages , messageData]);
      newMessageRef.current.value = "";
    }

    const handleAddChannel = ()=>{
          setAddChannelPopup(!addChannelPopup);
          console.log(addChannelPopup);
          
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
            <div>
            <span className="text-channel">TEXT CHANNELS </span>
            <button className="plus-btn"><img onClick={handleAddChannel} className="plus" src={Plus} alt="" /></button>
            </div>
            <ul>
              {channels.map((channel , index)=>{
                return <li key={index} onClick={()=>{handleChannelClick(channel)}}> {channel.type == "text" ? `😊 ${channel.channelname}` : ""}
                </li>
              })}
            </ul>
          </div>

          <div className="channel-group">
            <h3>VOICE CHANNELS</h3>
            <ul>
             {channels.map((channel , index)=>{
              return <li key={index} onClick={()=>{handleChannelClick(channel)}}>
               {channel.type == "voice" ? `🐼 ${channel.channelname}` : ""} </li>
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
       {addChannelPopup && <div className="modal-overlay"> 
          <div className="modal-content">
             <CreateChannel sendDataToParent = {handleDataFromChild} />
              </div>
                </div> }
                {selectedChannel ? (
                    <>
                        {/* Channel Header */}
                        <div className="channel-header">
                            <h2># {selectedChannel.channelname}</h2>
                        </div>

                        {/* Chat Area */}
                        <div className="chat-area">
                        <div className="messages" ref={chatContainerRef}>
                          {messages.map((msg, index) => {
                            const isSentByUser = msg.sender._id === user_id;
                            return (
                              <div key={index} className={`message-container ${isSentByUser ? "sent" : "received"}`}>
                                <p className="message-username">{msg.sender.username }</p> 
                                {/* Message Bubble */}
                                <div className="message-bubble">
                                  <p className="message-text">{msg.content}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Message Input */}
                        <div className="chat-input-container ">
                          <input onKeyDown={(e)=>{
                            if(e.key === "Enter"){
                              sendMessage();
                            }
                          }} ref={newMessageRef} type="text" placeholder="Message..." />
                          <button onClick={sendMessage} className="send-btn">&#x27A4;</button>
                        </div>
                      </div>

                    </>
                ) : (
                    <p className="select-channel-message">Select a channel to start chatting</p>
                )}
                
      </main>
    </div>
  </>
};

export default Hero;

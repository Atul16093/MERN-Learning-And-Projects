import "./Hero.css"
import minimize from "../../assets/Vector.svg"
import Plus from "../../assets/Plus.svg";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api.jsx"
import axios from "axios";
import socket from "../../socket/SocketUrl.jsx"
import CreateChannel from "./CreateChannel.jsx";
import CreateServer from "./CreateServer.jsx";
import VerticalDot from "../../assets/VerticalDot.svg";
import ServerOptions from "./ServerOptions.jsx";
import InvitePopup from "../InviteSection/InvitePopup.jsx";
import ProfilePopup from "../Profile/ProfilePopup.jsx";
import ServerSettingsPopup from "../ServerSetting/ServerSettingsPopup.jsx";
const Hero = () => {
    const [isHidden , setIsHidden] = useState(false);
    const [channels , setChannels] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages , setMessages] = useState([]);
    const [server , setServer] = useState();
    const serverData = useSelector((store)=>store.User ); 
    const [newServer , setNewServer] = useState(serverData.user.servers);

    const user_id = serverData.user.id;
    const newMessageRef = useRef();
    const chatContainerRef = useRef(null);
    const [addChannelPopup , setAddChannelPopup] = useState(false)
    const [addServerPopup , setAddServerPopup]   = useState(false);
    const [serverOptionsPopup , setServerOptionsPopup] = useState(false);
    const [deleteStatus , setDeleteStatus] = useState();
    //It's for invite popup 
    const [popupStatus , setPopupStatus] = useState(false);
    //Handle data from child 
    const handleDataFromChild = async(data)=>{
      try{
          setAddChannelPopup(data.data );
          let res = await axios.get(`${api.GET_CHANNEL}${data.serverId}` , {withCredentials : true});
          console.log(res.data.channelInfo);
          
           setChannels(res.data.channelInfo);    
      }catch(err){
        console.log("Error in handleDataFromChild" , err);
        
      }
    }
    useEffect(()=>{

    },[]);
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
        let res = await axios.get(`${api.GET_CHANNEL}${server._id}` , {withCredentials : true});
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
    }

    const handleCreateServer = async()=>{
         setAddServerPopup(true);
    }

    const handleByServer = (data)=>{
        setAddServerPopup(data)
        handleCreateData();
    }
    //WithCreditals true basically help us to taking the data from the cookies.
    const handleCreateData = async (data)=>{
      const res = await axios.get(`${api.ALL_SERVER}${serverData.user.id}`, {withCredentials : true});
      setNewServer(res.data.detail.servers);
        console.log("Handle create data " , data);
        setServer(data)
    }
    useEffect(()=>{
    }, []);
    const handleOptions = ()=>{      
        setServerOptionsPopup(!serverOptionsPopup)        
    }
    const handleInviteStatus = (data)=>{
      setServerOptionsPopup(!serverOptionsPopup)
      setPopupStatus(data);
    }
    //Handle the invite 
    const handleInvite = (data)=>{
      setPopupStatus(data)
      
    }
    const handleClick = (data)=>{
      console.log("See your clicking status " , data );
      setServerOptionsPopup(data)
    }
    const [userPopup , setUserPopup] = useState(false);
    //UserPopup
    const handleUserPopup = ()=>{
        setUserPopup(!userPopup);
    }
    //handle closing of profile
    const handleProfileClosing = (data)=>{
        setUserPopup(data)      
    }  
    let url = `http://localhost:5400${serverData.user.profilePic}`
    const [isClose , setIsClose] = useState(false);
    const handleIsClose = (data)=>{
      setServerOptionsPopup(!serverOptionsPopup)
      console.log("it's a data of is close ", data);
      setIsClose(data)
      
    }
    const handleSettingStatus = (data)=>{
      setIsClose(data);
    }
    //It's a editing popup closign and displaying function
    //Doing this for live rendering 
    const handleDeleteStatus =async (data)=>{
      console.log(data);
      const res = await axios.get(`${api.ALL_SERVER}${serverData.user.id}`, {withCredentials : true});
      setNewServer(res.data.detail.servers);
    }    
  return <>
    <div className="dashboard">
      {/* SERVER LIST (Far Left) */}
      <nav className="server-list">
        <ul>
          <li onClick={()=>{ setSelectedServer(null); min()}} className="server-icon home-icon">🏠</li>
          {newServer.map((server , index)=>{return <button className="server-icon" key={index} onClick={()=>handleServerClick(server)}>{server.servername[0]}</button>})}  
          <li onClick={handleCreateServer} className="server-icon"><img  src={Plus} alt="add Server" style={{width : "20px" , height : "20px"}} /></li>
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
            {(serverData.user.servers.length > 0 && serverData.user.servers[0].owner._id == user_id) ? 
            <button   onClick={handleAddChannel} style={{outline : "none" ,  width : "43px"}}  className="plus-btn">{selectedServer == null ? "" : <img className="plus" src={Plus} alt="" />}</button>
            :""}<button onClick={handleOptions} className="plus-btn"  style={{outline : "none" , marginLeft : "1px",  width : "40px"}}> {selectedServer == null ? "" : <img  src={VerticalDot} alt="dot img" style={{width : 25}}/>}</button>
            </div>
              {serverOptionsPopup ? <ServerOptions sendToHeroForDelete={handleDeleteStatus} isClose={handleIsClose} sendSelectedServer = {selectedServer} sendDataToChild = {serverData}  inviteStatus={handleInviteStatus}  clickSentToParent={handleClick}   /> : ""}
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
        {userPopup ? <div className="user-details"><ProfilePopup  profileState = {handleProfileClosing}  sendToChild = {serverData}  /> </div>: ""}
        <div className="user-info">
          <img src={url} alt="User" />          
          <div className="user-details">
            <button style={{outline : "none "}} onClick={handleUserPopup} className="username plus-btn">{serverData.user.username}</button>
            <p className="status">{serverData.user.status == "online" ? "🟢 Online" : serverData.user.status == "offline" ? "⚫ Offline" : serverData.user.status == "idle" ? "🌙 Idle" : serverData.user.status == "dnd" ? "⛔ DND" : ""} </p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT (Chat) */}
      <main className="main"> 
        {isClose ? <ServerSettingsPopup sendServerDetails = {selectedServer}  sendToHeroByServer={handleSettingStatus} /> : ""}
      {popupStatus ? <InvitePopup serverInfo = {selectedServer}  inviteClose = {handleInvite} /> : ""}

       {addChannelPopup && <div className="modal-overlay"> 
          <div className="modal-content">
             <CreateChannel sendDataToParent = {handleDataFromChild} serverId={selectedServer._id} />
              </div>
                </div> }

      {addServerPopup && <CreateServer sendDataToParent = {handleByServer} sendDataToHero={handleCreateData}  />}
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
                              <div key={index} className={`message-container ${isSentByUser ? "sent " : "received "}`}>
                                <p className="message-username ">{msg.sender.username }</p> 
                                {/* Message Bubble */}
                                <div className="message-bubble">
                                  <p className="message-text text-dark ">{msg.content}</p>
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

import { useState } from "react";
import "./ServerOptions.css"; // Import CSS

const ServerOptions = ({inviteStatus , clickSentToParent}) => {
    const [invitePopup , setInvitePopup] = useState(true);
    const [whileClick , setWhileClick]  = useState(false);
    const handleInvite = ()=>{
        setInvitePopup(!invitePopup);
        inviteStatus(invitePopup);
    }
    const handleWhileClick = ()=>{
        setWhileClick(!whileClick);
        clickSentToParent(whileClick);
    }
  return <>
    <div  className="server-options-menu">
      {/* <div className="menu-item">Mark As Read</div> */}
      <div onClick={()=>{handleInvite(); handleWhileClick()}} className="menu-item invite">Invite People</div>
      {/* <div className="menu-item">Mute Server ▶</div>
      <div className="menu-item">Notification Settings ▶</div>
      <div className="menu-item">
        Hide Muted Channels <input type="checkbox" />
      </div>
      <div className="menu-divider"></div>
      <div className="menu-item">Server Settings ▶</div>
      <div className="menu-item">Privacy Settings</div>
      <div className="menu-item">Edit Per-server Profile</div>
      <div className="menu-divider"></div>
      <div className="menu-item">Create Channel</div>
      <div className="menu-item">Create Category</div>
      <div className="menu-item">Create Event</div> */}
    </div>
</>
};

export default ServerOptions;

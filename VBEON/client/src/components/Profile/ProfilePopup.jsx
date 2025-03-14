import { useState, useEffect, useRef } from "react";
import "./ProfilePopup.css";

const ProfilePopup = ({profileState , sendToChild }) => {
  const [profileClosing , setProfileClosing ] = useState(false);
  const [userData , setUserData] = useState(sendToChild.user);
  const [editPopup , setEditPopup] = useState(true);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
       handleProfileClosing();       
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileClosing]);

  const handleProfileClosing = ()=>{
    setProfileClosing(!profileClosing);
    profileState(profileClosing);
  }
  let url = `http://localhost:5400${userData.profilePic}`
  return (
    <div className={`profile-overlay ${true? "show" : ""}`}>
      <div className={`profile-popup ${true? "popup-open" : "popup-close"}`} ref={popupRef}>
        <div className="profile-header">
          <img
            src={url}
            alt="Profile"
            className="profile-avatar"
          />
        </div>

        <h2 className="profile-name">{userData.username}</h2>
        <p className="username">{userData.username}</p>

        <div className="profile-promo">
          <span>Amp up your profile</span>
          <button className="close-promo">✖</button>
          <div className="promo-buttons">
            <button className="promo-btn">🚀 Get Nitro</button>
            <button className="promo-btn">🛍 Shop</button>
          </div>
        </div>

        <div className="profile-options">
          <button  className="profile-option">✏ Edit Profile</button>
          <button className="profile-option">{userData.status == "online" ? "🟢 Online" : userData.status == "offline" ? "⚫ Offline" : userData.status == "idle" ? "🌙 Idle" : userData.status == "dnd" ? "⛔ DND" : ""} </button>
          <button className="profile-option">🔄 Switch Accounts</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;

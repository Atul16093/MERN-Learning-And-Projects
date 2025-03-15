import { useEffect, useRef, useState } from "react";
import "./ServerSettingsPopup.css";
const ServerSettingsPopup = ({sendToHeroByServer , sendServerDetails}) => {
  const [close , setClose ] = useState(false);
//   if (!isOpen) return null;
 const popupRef = useRef(null);

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
       handleCloseServer() ;    
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

const handleCloseServer = ()=>{
    setClose(!close)
    sendToHeroByServer(close)
};
console.log(sendServerDetails);

const handleDelete = ()=>{
    
}
  return <>
     <div className="popup-overlay" >
       <div className="popup-container" ref={popupRef}>
         <div className="popup-header">
           <h2>Server Settings</h2>
           <button className="close-btn" >
           </button>
         </div>
         <div className="popup-body">
           <label>Server Name</label>
           <input className="in" type="text" placeholder="Enter new server name" />

           {/* <label>Server Profile</label>
           <input className="in" type="file" accept="image/*" /> */}

           {/* <button onClick={handleDelete}  className="delete-btn bt">Delete Server</button> */}
           <button className="update-btn bt">Update</button>
         </div>
       </div>
     </div>
</>
};

export default ServerSettingsPopup;

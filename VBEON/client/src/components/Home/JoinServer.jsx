import { useState } from "react";
import "./JoinServer.css";
import axios from "axios";
import api from "../../api";

const JoinServer = ({ closeStatus , popUpClose}) => {
    const [inviteLink, setInviteLink] = useState("");
    const [close , setClose]    =  useState();
     console.log(inviteLink);
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inviteLink) {
            alert("Please enter an invite link.");
            return;
        }
        //Getting the last invite code from here 
        const code = inviteLink.substring(34 , 42)
        const res = await axios.post(`${api.JOIN_SERVER}${code}` ,{}, {withCredentials : true})
        console.log(res);
        closePopup();
    };
    const handleClose = ()=>{
        setClose(false);
        closeStatus(close);
    }
    const closePopup = ()=>{
        setClose(false);
        popUpClose()
    }
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={closePopup}>×</button>
                <h2>Join a Server</h2>
                <p className="modal-description">
                    Enter an invite below to join an existing server
                </p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="invite-link" className="input-label">
                        INVITE LINK <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="invite-link"
                        className="invite-input"
                        placeholder="http://vbeon.gg/example"
                        value={inviteLink}
                        onChange={(e) => setInviteLink(e.target.value)}
                        required
                    />

                    <p className="invite-examples">INVITES SHOULD LOOK LIKE</p>
                    <p className="example-link">hTKzmak</p>
                    <p className="example-link">http://vbeon.gg/hTKzmak</p>
                    <p className="example-link">http://vbeon.gg/wumpus-friends</p>

                    <div className="discover-section">
                        <span className="discover-icon">✅</span>
                        <div>
                            <p className="discover-title">Don't have an invite?</p>
                            <p className="discover-text">Check out Discoverable communities in Server Discovery.</p>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="button" className="back-btn" onClick={handleClose}>Back</button>
                        <button type="submit" className="join-btn" >Join Server</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinServer;

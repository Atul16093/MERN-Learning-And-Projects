import { useState } from "react";
import "./JoinServer.css";

const JoinServer = ({ onClose }) => {
    const [inviteLink, setInviteLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inviteLink) {
            alert("Please enter an invite link.");
            return;
        }
        console.log("Joining server with invite:", inviteLink);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>×</button>
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
                        placeholder="https://discord.gg/example"
                        value={inviteLink}
                        onChange={(e) => setInviteLink(e.target.value)}
                        required
                    />

                    <p className="invite-examples">INVITES SHOULD LOOK LIKE</p>
                    <p className="example-link">hTKzmak</p>
                    <p className="example-link">https://discord.gg/hTKzmak</p>
                    <p className="example-link">https://discord.gg/wumpus-friends</p>

                    <div className="discover-section">
                        <span className="discover-icon">✅</span>
                        <div>
                            <p className="discover-title">Don't have an invite?</p>
                            <p className="discover-text">Check out Discoverable communities in Server Discovery.</p>
                        </div>
                    </div>

                    <div className="buttons">
                        <button type="button" className="back-btn" onClick={onClose}>Back</button>
                        <button type="submit" className="join-btn">Join Server</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinServer;

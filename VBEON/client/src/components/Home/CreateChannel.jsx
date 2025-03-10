import { useState } from "react";
import "./CreateChannel.css"
const CreateChannel = ({sendDataToParent})=>{
    const [status , setStatus] = useState();

    const handleCancel = ()=>{
        setStatus(false);
        sendDataToParent(status);
    }
    return <>
        <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Channel</h2>
        <p className="subheading">in Text Channels</p>

        <div className="channel-type-section">
          <label>
            <input
              type="radio"
              name="channelType"
              value="text"
            //   checked={channelType === "text"}
            />
            <div className="channel-type-info">
              <h4 style={{marginLeft : "30px"}}>Text</h4>
              <p>Send messages, images, GIFs, emoji, opinions</p>
            </div>
          </label>

          <label>
            <input
              type="radio"
              name="channelType"
              value="voice"
            //   checked={channelType === "voice"}
            //   onChange={(e) => setChannelType(e.target.value)}
            />
            <div className="channel-type-info">
              <h4>Voice</h4>
              <p>Hang out together with voice, video, and screen share</p>
            </div>
          </label>
        </div>

        <div className="input-section">
          <label htmlFor="channelName">CHANNEL NAME</label>
          <div className="channel-name-input">
            <span>#</span>
            <input
              id="channelName"
              type="text"
            //   value={channelName}
            //   onChange={(e) => setChannelName(e.target.value)}
            />
          </div>
        </div>

        <div className="private-channel-toggle">
          <label>
            <input
              type="checkbox"
            //   checked={isPrivate}
            //   onChange={() => setIsPrivate(!isPrivate)}
            />
            Private Channel
          </label>
          <p className="description">
            Only selected members and roles will be able to view this channel.
          </p>
        </div>

        <div className="modal-actions">
          <button onClick={()=>{handleCancel()}} className="cancel-btn" >
            Cancel
          </button>
          <button className="create-btn" >
            Create Channel
          </button>
        </div>
      </div>
    </div>
    </>
}
export default CreateChannel;
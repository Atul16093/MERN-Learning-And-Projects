import { useEffect, useRef, useState } from "react";
import "./CreateChannel.css"
import axios from "axios";
import api from "../../api";
const CreateChannel = ({sendDataToParent , serverId})=>{
    const [status , setStatus] = useState();    
    const channelNameRef = useRef();
    const textChannelRef = useRef();
    const voiceChannelref = useRef();

    const handleSubmit = async()=>{
        try{        
        await axios.post(`${api.CREATE_CHANNEL}/${serverId}/create` , {channelname : channelNameRef.current.value , type : textChannelRef.current.value},{
        withCredentials : true //it ensure cookies are send and the creditaial true help us to get the cookies from the browser storage
       });
        }catch(err){
          console.log("Error in handleSubmit function",err);
          
        }
       
      }
    const handleCancel = ()=>{
        setStatus(false);
        sendDataToParent({status , serverId});
    }
    return <>
        <div className="modal-overlay">
      <div className="modal-container">
        <h2>Create Channel</h2>
        <p className="subheading">in Text Channels</p>

        <div className="channel-type-section">
          <label>
            <input ref={textChannelRef}
              type="radio"
              name="channelType"
              value="text"/>
            <div className="channel-type-info">
              <h4 style={{marginLeft : "30px"}}>Text</h4>
              <p>Send messages, images, GIFs, emoji, opinions</p>
            </div>
          </label>

          <label>
            <input ref={voiceChannelref}
              type="radio"
              name="channelType"
              value="voice" />
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
            <input ref={channelNameRef}
              id="channelName"
              type="text"/>
          </div>
        </div>

        <div className="private-channel-toggle">
          <label>
            <input
              type="checkbox"/>
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
          <button onClick={()=>{handleSubmit(); handleCancel()}} className="create-btn" >
            Create Channel
          </button>
        </div>
      </div>
    </div>
    </>
}
export default CreateChannel;
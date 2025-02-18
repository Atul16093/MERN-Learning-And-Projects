import InviteLink from "../models/Invite.model.js"
import Server from "../models/server.model.js"
import crypto from "crypto";
export const createInvite = async (request , response , next)=>{
     try{
        const {serverId} = request.params;
        const serverStatus = await Server.findOne({_id : serverId});
        console.log(serverStatus);
        
        //Storing the invite link inside the Invite model
        if(serverStatus){
        const inviteCode = crypto.randomBytes(4).toString("hex");
       let inviteStatus = await InviteLink.create({serverId : serverStatus._id , code : inviteCode })
        
       if(!inviteStatus){
        return response.status(400).json({message : "Invite link not genrated"})
       }
       await Server.updateOne({_id : inviteStatus.serverId} , {$push : {inviteLinks : inviteStatus._id}})
        return response.status(201).json({message : "Invite link created successfully"});
        }else{
            return response.status(400).json({message : "Invalid server id"});
        }
     }catch(error){
        return response.status(400).json({message : error.message});
     }
}
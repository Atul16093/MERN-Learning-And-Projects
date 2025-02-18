import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Server from "../models/server.model.js";
import Invite from "../models/Invite.model.js";
export const createServer = async (request , response , next)=>{
        try{
            let {servername} = request.body;
             //Find the user who's creating a server
             let getUserId = jwt.verify(request.cookies.id , "secreat");
            //  console.log(getUserId.id);

            //First verify the user by there id,
            const user = await User.findById(getUserId.id);
            if(user){
               let serverStatus =  await Server.create({servername , owner : getUserId.id });

               //Updating the servers key in the user collection , 
                await User.updateOne({_id : getUserId.id},{$push : {servers : serverStatus._id}});
                return response.status(201).json({message : "Server created successfully"});
            }else{
                return response.status(400).json({message : error.message});
            }
        }catch(error){
            // console.log(error);
            return response.status(400).json({message : error.message});
        }
}
export const joinServer = async (request , response , next)=>{
    try{
        const {inviteCode} = request.params;
        let getUserId = jwt.verify(request.cookies.id , "secreat");
        let userId = getUserId.id;
        
        let inviteStatus = await Invite.findOne({code : inviteCode});

        if(!inviteStatus){
            return response.status(400).json({message : "Invalid Invite link"})
        }

        //get the server id 
        const serverId = inviteStatus.serverId;
        let serverStatus = await Server.findById({_id : serverId});

        if(!serverStatus){
            return response.status(400).json({message : "Server not found "});
        }
        if (serverStatus.members.includes(userId)) {
            return response.status(400).json({ message: "You are already a member of this server" });
        }
        
       let data =  await Server.updateOne({_id : serverId} , {$push: {members : userId}});
       console.log(data);
       
        return response.status(200).json({message : "Server joined successfully"});
    }catch(error){
        return response.status(400).json({message : error.message});
    }
}
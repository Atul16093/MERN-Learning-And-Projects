import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Server from "../models/server.model.js";
import Invite from "../models/Invite.model.js";
import Channel from "../models/channel.model.js";
export const createServer = async (request , response , next)=>{
        try{
            let {servername} = request.body;
             //Find the user who's creating a server
             let getUserId = jwt.verify(request.cookies.id , "secreat");
            //  console.log(getUserId.id);
            let serverStatus = await Server.findOne({servername});
            if(serverStatus){
                return response.status(400).json({message : "Server name already exist"});
            }
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
        
        await Server.updateOne({_id : serverId} , {$push: {members : userId}});
        await User.updateOne({_id : userId} , {$push : {servers : serverId}});
        return response.status(200).json({message : "Server joined successfully"});
    }catch(error){
        return response.status(400).json({message : error.message});
    }
}
//For leaving the server 
export const leave = async (request, response , next)=>{
    try{
        let {serverId} = request.params;
        let tokenObj = jwt.verify(request.cookies.id , "secreat");
        let getUserId = tokenObj.id;
        
        //Checking the server existence
        let serverStatus = await Server.findOne({_id : serverId});
        if(!serverStatus){
            return response.status(400).json({message : "Invalid server access"})
        }
        if(!serverStatus.members.includes(getUserId)){
            return response.status(400).json({message : "User not exist "});
        }
        
         await Server.updateOne({_id : serverId} , {$pull : {members : getUserId}});
         await User.updateOne({_id : getUserId} , {$pull : {servers : serverId}});
        return response.status(200).json({message : "You left"})
        
    }catch(error){
        return response.status(400).json({message : error.message});
    }
}

//Delete Server 
export const deleteServer = async (request , response , next)=>{
    try{
    let {serverId} = request.params;
    let serverStatus = await Server.findOne({_id : serverId});
    let tokenObj = jwt.verify(request.cookies.id , "secreat");
    let getUserId = tokenObj.id;
    if(!serverStatus){
        return response.status(400).json({message : "Invalid server access"});
    }
    //is the server admin want to delete the server
    if (serverStatus.owner.toString() !== getUserId) {
        return response.status(403).json({ message: "You're not the owner of this server, cann't delete it" });
    }
    await Channel.deleteMany({serverId : serverId});
    await User.updateMany({servers : serverId} , {$pull : {servers : serverId}} )
    await Server.deleteOne({_id : serverId} );
    return response.status(200).json({message : "Server and all associated channels deleted successfully"});
    }catch(error){
        return response.status(500).json({message : error.message});
    }
    
}

export const updateServerName = async (request , response , next)=>{
    try{
        let {serverId} = request.params;
        let {updatedName} = request.body;
        //checking the status of the channel 
        if(updatedName){
        let serverStatus = await Server.findOne({_id : serverId});
        if(!serverStatus){
            return response.status(400).json({message : "server not exist"})
        }
        let serverName = await Server.findOne({$and : [{_id : serverId} , {servername : updatedName}]});
        if(serverName){
            return response.status(400).json({message : "Server name already exist"});
        }
        await Server.updateOne({_id : serverId} , {$set : {servername : updatedName}});
        return response.status(201).json({message : "server name updated successfully"});
    }else{
        return response.status(400).json({message : "Give a new name"});
    }
    }catch(error){
        return response.status(500).json({message : error.message});
    }
}

//get Member details
export const getServerDetail = async(request , response , next)=>{
    try{
        let {serverId} = request.params;
        console.log(serverId);
        
        let serverInfo = await Server.findOne({_id : serverId})
        if(!serverInfo){
            return response.status(400).json({message : "Server not found"});
        }
        return response.status(200).json({message : "Success" , serverInfo} );
    }catch(err){
        console.log("Error in members controller " , err);
        return response.status(500).json({ message: "Internal server error" });
    }
}
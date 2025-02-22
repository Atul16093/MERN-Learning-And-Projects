import jwt from "jsonwebtoken";
import Channel from "../models/channel.model.js";
import Server from "../models/server.model.js";
export const createChannel =async (request , response , next)=>{
        try{
            let serverId = request.params.serverId; 
            let adminId = jwt.verify(request.cookies.id , "secreat");
            let isAdmin = await Server.findOne({_id : serverId , owner : adminId.id});

            if(!isAdmin){
                return response.status(400).json({message : "you're not the admin , cann't create a channel"})
            }
            let {channelname , type } = request.body;
            // console.log(channelname , type);

            let channel = await Channel.findOne({$and : [{serverId} , {channelname}]});

            //Is name already exist 
            
            if(channel){
                return response.status(409).json({message : "channel name already exist in this server"});
            }

            let status =  await Server.findOne({_id : serverId});
            if(status){
                //Here we create a channel according to currosponding server
            let channel = await Channel.create({serverId ,channelname , type});            
                console.log("Channel " , channel);
                
            //storing the channelId into the server collection, channel array field 
            await Server.updateOne({_id : serverId} , {$push : {channels : channel._id}})
                return response.status(201).json({message : "Channel created successfully " , channel});
            }else{
                return response.status(400).json({message : "Invalid server "});
            }
            
        }catch(error){
            console.log("Error in create channel route " , error);
            
            return response.status(500).json({message : "Internal server error "});
        }
}

export const deleteChannel = async (request , response , next)=>{
    try{
        let {channelId} = request.params;
        //checking the status of the channel 
        let adminId = jwt.verify(request.cookies.id , "secreat");
  
        let channelStatus = await Channel.findOne({_id : channelId});

        let isAdmin = await Server.findOne({_id : channelStatus.serverId , owner : adminId.id});
        
        if(!isAdmin){
            return response.status(403).json({message : "You don't have permission to delete this channel "})
        }
        if(!channelStatus){
            return response.status(400).json({message : "Channel not exist"})
        }
        await Server.updateOne({_id : channelStatus.serverId} , {$pull : {channels : channelId}});
        await Channel.deleteOne({_id : channelId});
        return response.status(200).json({message : "Channel deleted successfully"});
    }catch(error){
        return response.status(500).json({message : error.message});
    }
}

export const updateChannelName = async (request , response , next)=>{
    try{
        let {channelId} = request.params;
        let {updatedname} = request.body;
        let adminId = jwt.verify(request.cookies.id , "secreat");
        console.log(adminId);
        //checking the status of the channel 

        let channelStatus = await Channel.findOne({_id : channelId});
        let isAdmin = await Server.findOne({_id : channelStatus.serverId , owner : adminId.id});
        
        if(!isAdmin){
            return response.status(403).json({message : "You don't have permission to update the name  this channel "})
        }
        if(!channelStatus){
            return response.status(404).json({message : "Channel not exist"})
        }
        let channelName = await Channel.findOne({$and : [{_id : channelId} , {channelname : updatedname}]});
        if(channelName){
            return response.status(409).json({message : "Channel name already exist"});
        }
        await Channel.updateOne({_id : channelId} , {$set : {channelname : updatedname}});
        return response.status(201).json({message : "Channel name updated successfully" });
    }catch(error){
        return response.status(500).json({message : error.message});
    }
}
export const getChannel = async(request , response , next)=>{
    try{
        let {serverId} = request.params;
        console.log(serverId);
        
        let serverStatus = await Channel.findOne({serverId});
        if(!serverStatus){
            return response.status(400).json({message : "Server not found"});
        }
        let channelInfo = await Channel.find({serverId});
    
        return response.status(200).json({message : "Success" , channelInfo} );
    }catch(err){
        console.log("Error in getChannel controller " , err);
        return response.status(500).json({ message: "Internal server error" });
    }
}
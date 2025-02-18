import Channel from "../models/channel.model.js";
import Server from "../models/server.model.js";
export const createChannel =async (request , response , next)=>{
        try{
            let serverId = request.params.serverId; 
            let {channelname , type } = request.body;
            console.log(channelname , type);
            let status =  await Server.findOne({_id : serverId});
            if(status){
                //Here we create a channel according to currosponding server
            let channel = await Channel.create({serverId ,channelname , type});            
                console.log("Channel " , channel);
                
            //storing the channelId into the server collection, channel array field 
            await Server.updateOne({_id : serverId} , {$push : {channels : channel._id}})
                return response.status(201).json({message : "Channel created successfully "});
            }else{
                return response.status.json({message : "Invalid server "});
            }
            
        }catch(error){
            return response.status(400).json({message : error.message});
        }
}
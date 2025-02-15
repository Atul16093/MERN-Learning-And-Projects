import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Server from "../models/server.model.js";
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
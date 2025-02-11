import User from "../models/user.model.js";

//This must be imported for creating a connection  with the database
import db from "../db/dbConfig.js"
import bcrypt from "bcryptjs";
//signup controller
export const register = async (request , response , next)=>{
    try{
    let {username , email , password } = request.body;
    console.log(username , email, password);

    //Ecrypting the password 
    let saltKey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password , saltKey);
   
    //Creating a collection by using creaate command 
    const newUser = await User.create({username , email , password });

    console.log(newUser); 
    response.status(201).json({message : "User registered successfully!" , user : newUser});
    }catch(error){
        // console.log(error);
        response.status(400).json({error : error.message});
    }
}

export const login = async (request , response , next)=>{
    try{
        let {email , password} = request.body;
        console.log(email , password);
        
        let emailStatus = await User.findOne({email : email});
        console.log(emailStatus);
        //User authecation
        if(emailStatus){    
            let encrypted = emailStatus.password;
            let status = bcrypt.compareSync(password , encrypted);
            return response.status(200).json({message : "Login successfully " , status});
        }
    }catch(error){
        return response.status(400).json({error : error.message});
    }
}
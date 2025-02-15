import User from "../models/user.model.js";
//This must be imported for creating a connection  with the database
import bcrypt from "bcryptjs";
//importing helper class 
import Helper from "../Helper/Helper.js";
//importing templete class for send OTP with some already written text
import Templete  from "../utils/templete.js";
//importing a JWT token class
import JwtToken from "../utils/JwtToken.js";
//signup controller
export const register = async (request , response , next)=>{
    try{
    let {username , email , password } = request.body;
    // console.log(username , email, password);

    //Ecrypting the password 
    let saltKey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password , saltKey);
   
    const helper = new Helper();
    const OTP = helper.generateOtp(4);

    // Creating a collection by using create command 
     await User.create({username , email ,password ,  OTP});

    let data = {
        OTP : OTP,
        year : new Date().getFullYear(),
        appName :"VBEON",
        name : username,
        email : email,
        subject : "OTP FOR PASSWORD RESET"
    };
    // console.log(data);

    const templateData = new Templete().getOtpTemplete(data);
    helper.sendMail(data , templateData);

    //After the registration, a form will open to verify the email of the user by using get route

    response.status(201).json({message : "User registered successfully!" });
    }catch(error){
        // console.log(error);
        response.status(400).json({error : error.message});
    };

}

export const login = async (request , response , next)=>{
    try{
        let {email , password} = request.body;
        // console.log(email , password);
        
        let emailStatus = await User.findOne({email});
        //User authecation
        if(emailStatus){    
            let encrypted = emailStatus.password;
            let status = bcrypt.compareSync(password , encrypted);
            if(status){
            let token = new JwtToken();
            let email = emailStatus.email;
            let data =  token.tokenGenerate(email);
            // console.log(data);
            response.cookie("token" ,data );
            let id = emailStatus._id;
            let info = token.idToken(id);
            response.cookie("id" , info);
            return response.status(200).json({message : "Login successfully "});
            }
        }
    }catch(error){
        return response.status(400).json({error : error.message});
    }
}

//Verification route  ON the time of registration, is the email valid or not ? 

export const verify = async (request , response , next)=>{
    try{
        let {OTP} = request.body;
        
        let status = await User.findOne({OTP});
        
        if(status){
            return response.status(200).json({message : "User register successfully (redirect to the login page )"});
        }else{
            return response.status(400).json({message : "Incorrect OTP Register Again"})
        }
    }catch(error){
        return response.status(400).json({message : error.message});
        
    }

}


//Forget password router whenever user click on forget password this api request will trigger
export const forget = async (request , response , next)=>{
    try{
        const {email} = request.body;
        let status = await User.findOne({email})

        if(status){
            const helper = new Helper();
            const OTP = helper.generateOtp(6);
            let token = new JwtToken();
            //Stroing otp inside the token for matching
            let OTPCookie = token.OTPToken(OTP);
            // console.log(OTPCookie);
            response.cookie("OTPToken" , OTPCookie);
            let data =  {
                OTP : OTP,
                year : new Date().getFullYear(),
                appName :"VBEON",
                name : status.username,
                email :status.email,
                subject : "OTP FOR PASSWORD RESET"
            };
            const templateData = new Templete().getOtpTemplete(data);
            helper.sendMail(data , templateData);
            return response.status(200).json({message : "OTP sent successfully"})
        }
    }catch(error){
        return response.status(400).json({message : "Unathorized user  "})
    }
}

//get router 
export const updatePassword = (request , response , next)=>{
        try{
            //Now here a passoword updation window will open
            return response.status(201).json({message : "Password updated succesfully "});
        }catch(error){
            return response.status(400).json({message : error.message});
        }
}
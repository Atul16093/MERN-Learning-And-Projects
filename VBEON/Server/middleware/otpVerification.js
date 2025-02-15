import jwt from "jsonwebtoken";
export const OTPVerify = (request , response , next)=>{
    try{
        const {OTP} = request.body;

        let match = jwt.verify(request.cookies.OTPToken , "secreat")

        //If otp will match so user can reset the password a form will show to user for password reset 
       if(match.OTP == OTP){
            next()
            return response.status(200).json({message : "Successful"})
       }else{
        return response.status(400).json({message : "Invalid OTP"})
       }
    }catch(error){
        return response.status(400).json({message : error.message});
    }
}

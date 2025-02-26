import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const auth = (request , response , next)=>{
    
    if(jwt.verify(request.cookies.token , process.env.KEY)){
        next();
    }else{
        return response.status(401).json({message : "login first "});
    }
}
// export const sessionAuth = (request , response , next)=>{
//     if(request.session.isLoggedIn){
//         next();
//     }else{
//         return response.status(401).json({message : "login first"});
//     }
// }
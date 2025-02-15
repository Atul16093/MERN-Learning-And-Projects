import jwt from "jsonwebtoken"
export const auth = (request , response , next)=>{
    
    if(jwt.verify(request.cookies.token , "secreat")){
        next();
    }else{
        return response.status(400).json({message : "login first "});
    }
}
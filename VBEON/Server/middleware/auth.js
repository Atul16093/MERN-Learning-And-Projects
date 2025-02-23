import jwt from "jsonwebtoken"
export const auth = (request , response , next)=>{
    
    if(!jwt.verify(request.cookies.token , "secreat")){
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
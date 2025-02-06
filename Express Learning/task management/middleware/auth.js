export const verify = (request ,response , next)=>{
    if(request.session.isLoggedIn){
        next();
    }else{
        return response.redirect("/admin/sign-in");
    }
}
export const userVerification = (request , response , next)=>{
    if(request.session.isLoggedIn){
        next();
    }else{
        return response.redirect("/user/sign-in");
    }
}
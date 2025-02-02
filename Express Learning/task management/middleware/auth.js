export const verify = (request ,response , next)=>{
    if(request.session.isLoggedIn){
        next();
    }else{
        return response.redirect("/admin/sign-in");
    }
}
export const verify  = (request , response , next)=>{
    if(request.session.isTrue){
        next();
    }else{
        response.redirect("/admin/sign-in");
    }
}
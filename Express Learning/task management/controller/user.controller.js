import User from "../model/user.model.js";
import Role from "../model/role.model.js";
export const signUp = async (request , response, next)=>{
    try{
    let role = new Role();
    let domain = await role.roleInfo();
    return response.render("user/sign-up.ejs" , {domain});
    }catch(err){
        console.log(err);
    }
}
//sign-in page diplay
export const signIn = (request , response ,next)=>{
        return response.render("user/sign-in.ejs");
}

//sign-up action
export const signInAction = async(request , response , next)=>{
    try{
        let {useremail , userpassword} = request.body;        
        await User.authenticate({useremail , userpassword});
        request.session.isLoggedIn = true;
        request.session.useremail = useremail;
        return response.render("user/home.ejs" );
        }catch(err){
            console.log(err);
        }
}

export const userHome = (request , response , next)=>{
    return response.render("user/home.ejs");
}
export const signUPAction = async (request , response , next)=>{
    try{
    let {fullname , email , role , password} = request.body;
    console.log(fullname, email, role , password);
    
    let record = new User(null , fullname , email, role , password);
     await record.roleInfo();
    return response.redirect("/user/sign-in");
    }catch(err){
        console.log(err);
    }  
}
export const logout = (request , response , next)=>{
    request.session.isLoggedIn = false;
    request.session.useremail = null;
    return response.render("user/sign-in.ejs");
}
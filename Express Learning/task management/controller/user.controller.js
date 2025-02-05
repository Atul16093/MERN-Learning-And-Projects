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
        return response.render("user/userNav.ejs");
        }catch(err){
            console.log(err);
        }
}

export const userHome = (request , response , next)=>{
    return response.render("user/userNav.ejs");
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
    return response.render("user/sign-in.ejs");
}
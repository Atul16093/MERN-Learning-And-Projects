import User from "../model/user.model.js";
import Role from "../model/role.model.js";
import bcrypt from 'bcryptjs'
import { validationResult } from "express-validator";
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
        let user = await User.authenticateEmail({useremail});
        // console.log(user);
        
        if(user){
            let pass = user[0].password;
            // console.log(pass);
            let status = bcrypt.compareSync(userpassword , pass )
            console.log(status);
            //Here whenever the status get true we will pass getted password from the reuslt  and enter into the method
            if(status){
             await User.authenticate({useremail , pass});
             request.session.isLoggedIn = true;
             request.session.useremail = useremail;
            return response.render("user/home.ejs" );
            }
        }
        }catch(err){
            console.log(err);
        }
}

export const userHome = (request , response , next)=>{
    return response.render("user/home.ejs");
}
export const signUPAction = async (request , response , next)=>{
    const err = validationResult(request);
    if(err.isEmpty()){
    try{
    let {fullname , email , role , password} = request.body;
    let saltKey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password , saltKey);
    console.log(password);
    console.log(fullname, email, role , password);
    
    let record = new User(null , fullname , email, role , password);
     await record.roleInfo();
    return response.redirect("/user/sign-in");
    }catch(err){
        console.log(err);
    }  
  }else{    
    return response.status(400).json({error : "bad request" , err : err.array()});
  }
}
export const logout = (request , response , next)=>{
    request.session.isLoggedIn = false;
    request.session.useremail = null;
    return response.render("user/sign-in.ejs");
}
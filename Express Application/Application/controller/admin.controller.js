import { request } from "express";
import pool from "../db/db.config.js"
import Admin from "../model/AdminOfModel.js";
export const dashboardPageAction = (req , res , next)=>{
    res.render("dashboard.ejs");
}
export const singInPage = (req , res , next)=>{
    res.render("sign-in.ejs")
}
export const signInAction = (req , res , next)=>{
   // Extract id, name, email, and password from the request body
    const { name , email , password} = req.body;
    console.log("Received Data:", { name, email, password });
    let admin  = new Admin( name , email , password);
    admin.authenticate()
    .then(result=>{
        if(result.length > 0){
            res.redirect("/admin/dashboard");     
        }else{
            res.redirect("/admin/sign-in");
        }
    })
    .catch(err=>{
        console.log(err); 
    })

}



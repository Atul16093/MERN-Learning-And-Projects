 import { request, response } from "express";
import pool from "../db/db.config.js";
 export const header = (request , response , next)=>{
         response.render("header.ejs");
 }
 export const create = (request , response , next)=>{
        response.render("createTask.ejs");
 }
 export const createAction = (request, response , next)=>{
        let {date , task , description} = request.body;
        pool.getConnection((err , con)=>{
            if(!err){
                let sql = "INSERT INTO task (date , task , description) values(? , ? , ?)"
                con.query(sql , [date , task , description] , (err , result)=>{
                    console.log(result);
                    if(!err){
                        if(result.length !=0){
                            console.log("Data inserted successfully");
                            response.redirect("/task/create")
                        }else{
                            console.log("Data insertion failed...");   
                        }
                    }else{
                        console.log("It's a query error ", err);
                        
                    }
                })
            }else{
                console.log(err);
            }
        })        
 }
 export const display = (request , response , next)=>{
        response.render("display.ejs");
 }
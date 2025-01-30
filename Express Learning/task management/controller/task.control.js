// import pool from "../db/db.config.js";
import { response } from "express";
import Task from "../model/task.model.js";
import TaskPriorty from "../model/priority.model.js";
 export const header = (request , response , next)=>{
         response.render("header.ejs");
 }
 export const create = async (request , response , next)=>{
    try{
        let taskPriorities = await (TaskPriorty.findAll());
        return response.render("createTask.ejs" , {taskPriorities});
        }catch(err){
            console.log(err);
        }

 }
 export const createAction = async (request, response , next)=>{
    try{
        let {task , description  , priority_id} = request.body;
        let status = 'Active';
        let date = new Date();
        date = date.getDate() + "-" + (date.getMonth()+1)+"-"+date.getFullYear();
        let isCreated = await Task.create({task , description , date , priority_id});
        return response.redirect("/task/create")
    }catch(err){
        console.log(err);  
    }
        // let {date , task , description} = request.body;
        // pool.getConnection((err , con)=>{
        //     if(!err){
        //         let sql = "INSERT INTO task (date , task , description) values(? , ? , ?)"
        //         con.query(sql , [date , task , description] , (err , result)=>{
        //             console.log(result);
        //             if(!err){
        //                 if(result.length !=0){
        //                     console.log("Data inserted successfully");
        //                     response.redirect("/task/create")
        //                 }else{
        //                     console.log("Data insertion failed...");   
        //                 }
        //             }else{
        //                 console.log("It's a query error ", err);
                        
        //             }
        //         })
        //     }else{
        //         console.log(err);
        //     }
        // })        
 }
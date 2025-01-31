// import pool from "../db/db.config.js";
import { request, response } from "express";
import Task from "../model/task.model.js";
import TaskPriorty from "../model/priority.model.js";

export const filterTask = async (request , response , next)=>{    // viewTask
        let id = request.params.id;
        console.log(id);
        let filterUnit = await (Task.filterData(id));
        console.log(filterUnit);
        return response.render("viewTask.ejs" , {data : filterUnit});

}

 export const header = (request , response , next)=>{
         response.render("header.ejs");
 }
 export const create = async (request , response , next)=>{
    try{
        let taskPriorities = await (TaskPriorty.findAll());  //priority model 
        // console.log(taskPriorities);
        return response.render("createTask.ejs" , {taskPriorities});
        }catch(err){
            console.log(err);
        }
 }
 export const createAction = async (request, response , next)=>{  // task model
    try{        
        let {task , description  , priorityId} = request.body;
        console.log(task , description , priorityId);
        let status = 'Active';
        let date = new Date();
        date = date.getDate() + "-" + (date.getMonth()+1)+"-"+date.getFullYear();
        let isCreated = await Task.create({task , description , date , priorityId});
        return response.redirect("/task/create")
    }catch(err){
        response.render("error.ejs")
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

 export const viewTask = async (request , response , next)=>{
      try{
       let data = await (Task.display());
    //    let taskPriorities = await (TaskPriorty.findAll());
       return response.render("viewTask.ejs" , {data});
      }catch(err){
        return response.render("error.ejs")
      }
 }
// import pool from "../db/db.config.js";
import { request, response } from "express";
import Task from "../model/task.model.js";
import TaskPriorty from "../model/priority.model.js";

export const displayUpdate = async (request , response , next)=>{
    try{
        let id = request.params.id;
        console.log(id);
        let taskPriorities = await (TaskPriorty.findAll());  //priority model 
        let data = await (Task.display());
        // console.log(taskPriorities);
        return response.render("update.ejs" , {taskPriorities , id , data});
        }catch(err){
            console.log(err);
        }
}

export const update = async(request , response , next)=>{
    try{
     let {task , description , priorityId } = request.body;
     console.log(task , description , priorityId);
     let status = 'pending';
     let date = new Date();
     date = date.getDate() + "-" + (date.getMonth()+1)+"-"+date.getFullYear();
     let t1 = new Task();
     let id = request.params.id;
    //  console.log("Here's the id " , id);
     let isUpdated = await t1.update({task , description , date , priorityId , id});
     console.log(isUpdated);
     return response.redirect("/task/view-task");
    }catch(err){
        console.log(err);
    }
     
     
}

export const removeTask = async (request , response , next)=>{
    try{
        let id = request.params.id;
        let took = new Task();
        let data = await took.removeTask(id);
        console.log(data);        
        return response.redirect("/task/view-task");
    }catch(err){
        console.log(err);
        return response.render("error.ejs");
        
    }
       
        
}


export const filterTask = async (request , response , next)=>{    // viewTask.ejs 
    try{
        let id = request.params.id;
        console.log(id);
        let filterUnit = await (Task.filterData(id));
        console.log(filterUnit);
        return response.render("viewTask.ejs" , {data : filterUnit});
    }catch(err){
        console.log(err);
        response.render("error.ejs")
    }

}

 export const header = (request , response , next)=>{
         response.render("header.ejs");
 }
 

 //create task middleware 
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
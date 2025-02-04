// import pool from "../db/db.config.js";
import { request, response } from "express";
import Task from "../model/task.model.js";
import TaskPriorty from "../model/priority.model.js";
import Role from "../model/role.model.js";
import { completeTask } from "./usertask.controller.js";
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
        let domainObj = new Role();
       let getDomain =  await domainObj.roleInfo();
        return response.render("createTask.ejs" , {taskPriorities , getDomain });
        }catch(err){
            console.log(err);
        }
 }
 export const createAction = async (request, response , next)=>{  // task model
    try{        
        let {task , description  , priorityId , role} = request.body;
        console.log(task , description , priorityId ,role);
        let status = 'Active';
        let date = new Date();
        date = date.getDate() + "-" + (date.getMonth()+1)+"-"+date.getFullYear();
        let getUsername = await (Task.user(role));
        console.log(getUsername);
        let isCreated = await Task.create({task , description , date , priorityId});
        return response.render("username.ejs" , {getUsername});
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

 export const assign = async (request ,response ,next)=>{
        let {userId , roleId } = request.body;
        await Task.assign({userId , roleId});
        return response.redirect("/task/create")
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

 export const completedTask = async (request , response ,next)=>{
    try{
        let data = await (Task.allCompleted());
        return response.render("allCompletedTask.ejs" , {data})
    }catch(err){
        console.log(err);
        
    }
 }
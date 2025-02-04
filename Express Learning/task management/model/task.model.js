import pool from "../db/db.config.js";
let insertedTaskId;
export default class task{
    constructor(id , task , description , status , date , priority){
        this.id = id ;
        this.task = task;
        this.description = description;
        this.status = status;
        this.date = date;
        this.priority = priority;
    }
    static create(add){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "INSERT INTO task (task , description , date , priority_id) values (? , ? , ? , ? )";
                    console.log("Here your record " , add.priorityId);
                    con.query(sql , [add.task , add.description , add.date , add.priorityId] , (err , result)=>{
                        con.release();
                         insertedTaskId = result.insertId; // Get the inserted task ID
                        
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }

    //For adding the user_id and role_Id
    static assign(task){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "UPDATE task SET user_id = ?, roleId = ? where id = ?"
                    con.query(sql , [task.userId , task.roleId , insertedTaskId] , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }else {
                    console.log(err);
                    
                }
            })
        })
    }
    static display(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "select * from task as t left join user as u on t.user_id = u.userId ";
                    con.query(sql , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }else{
                    console.log(err);                    
                }
            })
        })
    }
    static remove(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con )=>{
                if(!err){
                    let sql = "DELETE FROM task where id = ?";
                    con.query = (sql , [] , (err , result)=>{
                        err ? reject(err) : resolve(result);
                    })
                }else{
                    console.log(err);
                    
                }
                })
        })
    }
    static filterData(id){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "select * from task as t inner join task_priority as tp on t.priority_id = tp.id where t.priority_id = ?";
                    con.query(sql , [id*1] , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }else{
                    console.log(err);   
                }
            })
        })
    }
    removeTask(id){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                let sql = " delete from task where id = ?"
                con.query(sql , [id] , (err , result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                });
                
                // con.query(sql , [this.id])
                }else{
                    console.log(err);
                    
                }
            })
        })
    }
  update(task){
    return new Promise((resolve , reject)=>{
        pool.getConnection((err , con)=>{
            if(!err){
                let sql = "UPDATE task SET task = ? , description = ? , date = ? , priority_id = ? where id = ?"
                con.query(sql , [task.task , task.description , task.date , task.priorityId , task.id] , (err , result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                })
            }else {
                console.log(err);
                
            }
        })
    })
  }

  // User info automode

  static user(role){
    return new Promise((resolve , reject )=>{
        pool.getConnection((err , con)=>{
            if(!err){
                let sql = "select * from user as u inner join role as r on u.Role = r.roleId where u.Role = ?";
                con.query(sql ,[role], (err , result)=>{
                    err ? reject(err) : resolve(result);
                })
            }
        })
    })
  }


  //completed task
  static allCompleted(){
    return new Promise((resolve , reject)=>{
        pool.getConnection((err , con)=>{
            if(!err){
                let sql = "select * from task as t inner join user as u on t.user_id = u.userId WHERE t.status = 'complete'";
                con.query(sql , (err , result)=>{
                    con.release();
                    err ? reject(err) : resolve (result);
                })
            }else{
                console.log(err);
            }
        })
    })
}
}
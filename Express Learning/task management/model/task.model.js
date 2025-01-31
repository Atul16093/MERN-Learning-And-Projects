import pool from "../db/db.config.js";

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
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
    static display(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "SELECT * FROM task";
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
}
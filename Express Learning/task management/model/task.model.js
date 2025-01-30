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
                    con.query(sql , [add.task , add.description , add.date , add.priority_id] , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
}
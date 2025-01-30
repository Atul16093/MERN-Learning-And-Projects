import pool from "../db/db.config.js";
export default class priority{
    constructor(id , priority){
        this.id = id;
        this.priority = priority;
    }
    static findAll(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                let sql = "select * from task_priority"
                con.query(sql ,(err , result)=>{
                    con.release();
                    err ? reject(err) : resolve(result);
                });
            }else{
                console.log(err);
                
            }
            })
        })
    }
}
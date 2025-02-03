import pool from "../db/db.config.js";
export default class User {
    constructor(id , name , email , role , password){
        this.id = id ; 
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
    roleInfo(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "Insert into user(Name ,email , Role , password) values(?,?,?,?)";
                    con.query(sql ,[this.name , this.email , this.role , this.password], (err , result)=>{
                        con.release();
                        console.log(result);
                        
                        err ? reject(err) : resolve(result);
                    })
                }
            })
        })
    }
}


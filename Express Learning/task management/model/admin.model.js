import pool from "../db/db.config.js";
export default class admin{
    constructor(id , email , password){
        this.id = id ;
        this.email = email ;
        this.password = password;
    }
    authenticate(){
        return new Promise((resolve , reject)=>{
        pool.getConnection((err , con)=>{
            if(!err){
                let sql = "select * from admin where email = ? and password = ? "
                con.query(sql , [this.email , this.password] , (err , result)=>{  
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
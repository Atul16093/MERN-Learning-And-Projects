import pool from "../db/db.config.js";

export default class Admin{
    constructor( name , email , password){
        this.name = name ;
        this.email = email;
        this.password = password;
    }
    //that all the thing is squalize bascially squalize provide us built in method and 
    // that thing we did in the authentication that all the code write insdie the squalize built in method 
    authenticate(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                  let sql = "SELECT * FROM admin WHERE Name = ? AND Email = ? AND Password = ?";
                  con.query(sql , [this.name , this.email , this.password] , (err , result)=>{
                       con.release();
                    if(!err){
                        resolve(result);
                        console.log(result.length, result);
                        
                    }else{
                        reject(err);
                    }
                  })
                }else{
                    reject(err);
                }
            })
        });
    }
}
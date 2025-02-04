import pool from "../db/db.config.js";
let id ;
export default class User {
    constructor(id , name , email , role , password){
        this.id = id ; 
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
    }
    // insert record into the role 
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

    // sign-in authentication 
    static authenticate(record){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "select userId from user where email = ? and password = ?";
                    con.query(sql , [record.useremail , record.userpassword] , (err , result)=>{
                        con.release();
                        console.log(result);
                        id = result[0].userId;
                        
                        err ? reject(err) : resolve(result);
                    })
                }else{
                    console.log(err);
                    
                }
            })
        })
    }

    // _______________________________________________________________________________________________________
    // user task methods 
    static showTask(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "select * from task as t inner join user as u on t.user_id = u.userId where userId = ? AND t.status = 'pending'";
                    con.query(sql ,[id] , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve (result);
                    })
                }else{
                    console.log(err);
                }
            })
        })
    }
    static setStatus(id){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = " update task set status = 'complete' where id = ?";
                    con.query(sql ,[id] , (err , result)=>{
                        con.release();
                        err ? reject(err) : resolve (result);
                    })
                }else{
                    console.log(err);
                }
            })
        })
    }

    static completedTask(){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "select * from task as t inner join user as u on t.user_id = u.userId where userId = ? AND t.status = 'complete'";
                    con.query(sql ,[id] , (err , result)=>{
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


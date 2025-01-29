import pool from "../db/db.config.js";
export const signInPage = (request , response , next)=>{
        response.render("sign-in.ejs")
}

export const signInAction = (request , response , next)=>{
        let {email , password} = request.body;
        pool.getConnection((err , con)=>{
                if(!err){
                let sql = "select * from admin where email = ? and password = ?"
                // let sql = "insert into admin(email , password) values( ? , ?)"
                 con.query(sql , [email , password] , (err , result)=>{
                        con.release();
                       if(!err){
                          if(result.length != 0 ){
                                console.log(result);
                                console.log("sign-in success");
                          }else{
                                console.log("sign-in failed...");     
                          }
                       }else{
                        console.log(err);
                       }
                 });

                }else{
                        console.log(err);
                        
                }
        })
}
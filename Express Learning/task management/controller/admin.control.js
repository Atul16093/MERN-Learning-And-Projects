// import pool from "../db/db.config.js";
import Admin from "../model/admin.model.js";
export const signInPage = (request , response , next)=>{
        response.render("sign-in.ejs")
}

export const signInAction = (request , response , next)=>{
        let {email , password} = request.body;
        let admin = new Admin(null , email , password);
        admin.authenticate()
        .then(result=>{
                request.session.sessionId = result[0].id;
                request.session.sessionEmail = result[0].email;
                request.session.isLoggedIn = true;
                console.log(result);
            return result.length ? response.render("header.ejs") : response.redirect("/admin/sign-in");
        }).catch(err=>{
                console.log(err);      
        })

        // pool.getConnection((err , con)=>{
        //         if(!err){
        //         let sql = "select * from admin where email = ? and password = ?"
        //         // let sql = "insert into admin(email , password) values( ? , ?)"
        //          con.query(sql , [email , password] , (err , result)=>{
        //                 con.release();
        //                if(!err){
        //                   if(result.length != 0 ){
        //                         console.log(result);
        //                         console.log("sign-in success");
        //                         response.redirect("/task/header")
        //                   }else{
        //                         console.log("sign-in failed...");     
        //                   }
        //                }else{
        //                 console.log(err);
        //                }
        //          });

        //         }else{
        //                 console.log(err);
                        
        //         }
        // })
}
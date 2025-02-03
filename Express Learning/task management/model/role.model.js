import pool from "../db/db.config.js";
export default class Role{
    constructor(roleId , role ){
        this.roleId = roleId ;
        this.role = role
    }
        roleInfo(){
            return new Promise((resolve , reject)=>{
                pool.getConnection((err , con)=>{
                    if(!err){
                        let sql = "SELECT * FROM role";
                        con.query(sql , (err , result)=>{
                            con.release();
                            err ? reject(err) : resolve(result);
                        })
                    }
                })
            })
        }
}
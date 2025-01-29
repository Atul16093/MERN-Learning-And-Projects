 import mysql from "mysql2";

const pool = mysql.createPool({
    user : "root",
    password : "Aa*6265654159*",
    host : "localhost",
    database : "task_management"
})
export default pool;

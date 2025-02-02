import mysql from "mysql2";

const pool = mysql.createPool({
    user : "root",
    password : "Aa*6265654159*",
    database : "ejsappdb",
    host : "localhost"
});

export default pool;
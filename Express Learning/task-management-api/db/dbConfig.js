import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_management_api","root",'Aa*6265654159*',{
    host: "localhost",
    dialect: 'mysql'
 });
 
sequelize.authenticate()
.then(result=>{
    console.log("Database connnected...");
}).catch(err=>{
    console.log("Database not connected....");
    console.log(err);
});
export default sequelize;
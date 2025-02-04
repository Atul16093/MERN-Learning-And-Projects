 import express from "express";
 import bodyParser from "body-parser";
 import adminRouter from "./router/admin.router.js"
 import taskRouter from "./router/task.router.js"
 import session from "express-session";
 import userRouter from "./router/user.router.js";
 import usertaskRouter from "./router/usertask.router.js"
 const app = express();
 app.set("view engine" , "ejs")
 app.use(express.static("./public"));
 app.use(bodyParser.urlencoded({extended : true}))
 app.use(bodyParser.json());
 app.use(session({secret:"BeliveOnYou" ,saveUninitialized : true , resave : true}));
 app.use("/admin" , adminRouter)
 app.use("/user" , userRouter);
 app.use("/usertask" , usertaskRouter);
 app.use("/task" , taskRouter);
 app.listen(3000 , ()=>{
    console.log("Server started http://localhost:3000");
 })

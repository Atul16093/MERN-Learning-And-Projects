 import express from "express";
 import bodyParser from "body-parser";
 import adminRouter from "./router/admin.router.js"
 import taskRouter from "./router/task.router.js"
 import session from "express-session";
 import userRouter from "./router/user.router.js";
 import usertaskRouter from "./router/usertask.router.js"
 const app = express();
 //This is use for to tell the express application we use any other engine
 app.set("view engine" , "ejs")
 //Parsing the url data automatically by using body parser 
 app.use(express.static("./public"));
 app.use(bodyParser.urlencoded({extended : true}))
 app.use(bodyParser.json());
 app.use(session({secret:"BeliveOnYou" ,saveUninitialized : true , resave : true}));
  app.use("/admin" , adminRouter)
 app.use("/user" , userRouter);
 app.use("/usertask" , usertaskRouter);
 app.use("/task" , taskRouter);
 //Creating a server
 app.listen(3000 , ()=>{
    console.log("Server started http://localhost:3000");
 })

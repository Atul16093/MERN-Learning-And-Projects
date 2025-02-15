import express from "express"
import userRouter from "./router/user.routes.js";
import serverRouter from "./router/server.routes.js";
import connection from "./db/dbConfig.js";
import cookieParser from "cookie-parser";
const app = express();
connection();
// app.use(session({secret:"BeliveOnYou" ,saveUninitialized : true , resave : true}));
app.use(express.urlencoded({extended : true}))
app.use(express.json());
//Must need to use this built in middleware, if you want to read the cookies data.
app.use(cookieParser());
app.use("/" , userRouter)
app.use("/server" , serverRouter);
app.use("/channels" , channelRouter);
app.listen(process.env.PORT||3000 , ()=>{
    console.log("Server started http://localhost:3000");
})
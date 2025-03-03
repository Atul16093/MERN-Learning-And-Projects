import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import session from "express-session";
import { Server } from "socket.io";
import {createServer} from "http";
import connection from "./db/dbConfig.js";
import userRouter from "./router/user.routes.js";
import serverRouter from "./router/server.routes.js";
import channelRouter from "./router/channel.routes.js"
import cors from "cors";
dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server);
connection();
// app.use(session({secret:"BeliveOnYou" ,saveUninitialized : true , resave : true}));
app.set("view engine" , "ejs");
app.use(express.urlencoded({extended : true}))
app.use(express.json());
const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true,               
  };
app.use(cors(corsOptions));
//Must need to use this built in middleware, if you want to read the cookies data.
app.use(cookieParser());
app.use(express.static("./public"))
app.use("/user" , userRouter)
app.use("/server" , serverRouter);
app.use("/channel" , channelRouter);
io.on("connection" , (socket)=>{
    console.log("User connected");
    console.log("id" , socket.id);
    
    
})
server.listen(process.env.PORT||3000 , ()=>{
    console.log(`Server started http://localhost:${process.env.PORT}`);
})
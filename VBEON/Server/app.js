import express from "express"
import userRouter from "./router/user.routes.js";

const app = express();

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use("/user" , userRouter)

app.listen(3000 , ()=>{
    console.log("Server started http://localhost:3000");
})
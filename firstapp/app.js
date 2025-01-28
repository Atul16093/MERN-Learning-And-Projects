import express, { response } from "express";

const app = express();
console.log(express);

app.post("/sign-up",(request,response,next)=>{
    console.log("Sign up success.....");
    response.end("Sign up success....");
});

app.get("/home",(request,response,next)=>{
    response.write("Home Page");
    response.end();
});

app.get("/about",(request,response,next)=>{
    response.end("About Page");
});

app.get("/contact",(request,response,next)=>{
    response.end("Contact Page");
})

app.use((request,response,next)=>{
    console.log("use called..........");
    response.end("Request resource not available : "+request.url);
});

app.listen(3000,()=>{
    console.log("Server Starteed.. at http://localhost:3000");
});
import express from "express";
import bodyParser from "body-parser"
//Here we're importing the router from routes folder 
import AdminRouter from "./routes/admin.route.js"
import session from "express-session";
import ProductRouter from "./routes/product.route.js"
//Creating an application
const app = express();
app.set("view engine" , "ejs");

// body-parser convert the form data into the form of object
app.use(bodyParser.json());

// if we want to send the data though xwwwurlendcode so we need to write this 
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret:"DesireMeanNeverQuite" }));
app.use("/admin" , AdminRouter);
app.use("/product", ProductRouter);

app.listen(3001 , ()=>{
    console.log("Server Started");
}) 

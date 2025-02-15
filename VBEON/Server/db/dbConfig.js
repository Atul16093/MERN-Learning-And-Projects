import mongoose from "mongoose";
let connection = ()=>{
mongoose.connect("mongodb://127.0.0.1:27017/vbeon")
.then(()=>{
    console.log("Database connected");
}).catch(err=>{
    console.log(err);
})
}
export default connection;

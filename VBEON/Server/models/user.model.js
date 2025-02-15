import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
   email : {
        type : String,
        required : true,
        unique : true
   },
   password : {
        type : String,
        required : true
   },
   friends : {
        type : [String],
   },
   servers : {
        type : [{type : mongoose.Schema.Types.ObjectId , ref : "Server"}],
   },
   OTP : {
        type : Number,
   }
});

const user = mongoose.model("user" , userSchema);

export default user;

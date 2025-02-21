import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    receiver :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    audioUrl: {
        type: String,
        required: false, 
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
);

const message = mongoose.model("message" , messageSchema);

export default message;
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    receiver :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
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

const Message = mongoose.model("Message" , messageSchema);

export default Message;
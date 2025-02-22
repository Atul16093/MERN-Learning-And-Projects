import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    serverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Server"
    },
    channelname : {
        type : String,
        required : true,
    },
    type : {
        type : String,
        enum : ["text" , "voice" ],
        required : true
    },
    messages : {
        type : [String]
    }
})

const Channel = mongoose.model("Channel" , channelSchema);
export default Channel;
import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    serverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "server"
    },
    channelname : {
        type : String,
        unique : true
    },
    type : {
        type : String,
        enum : ["text" , "voice" ],
        required : true
    },
    messages : {
        type : []
    }
})

const channel = mongoose.model("channel" , channelSchema);
export default channel;
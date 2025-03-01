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
    //I'll check this during the member access the channel, if user is moderator or admin so they can send the message otherwise member see a message "only admin and moderator "
    permittedRoles: {
        type: [String],
        enum: ["admin", "moderator", "member"], 
        default: ["admin", "moderator"] 
    },
    messages : {
        type : [String]
    }
})

const Channel = mongoose.model("Channel" , channelSchema);
export default Channel;
import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    servername : {
        type : String,
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    members : {
        type : [String],
    },
    channels : {
        type : [String],
    },
    inviteLinks : {
        type : [String]
    }
})

const server = mongoose.model("server" , serverSchema);
export default server;
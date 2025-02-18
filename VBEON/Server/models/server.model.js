import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    servername: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Must match the User model name
        required: true
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId, // 
            ref: "channel" // 
        }
    ],
    inviteLinks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InviteLink"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const server = mongoose.model("server" , serverSchema);
export default server;

/*import mongoose from "mongoose";

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
        type : [{
            types : mongoose.Schema.Types.ObjectId,
            ref : "channel"
         }]
    },
    inviteLinks : {
        type : [String]
    }
})

const server = mongoose.model("server" , serverSchema);
export default server;
*/
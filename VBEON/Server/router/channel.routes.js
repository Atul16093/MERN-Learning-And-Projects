import express from "express";
import {createChannel,
        deleteChannel,
        updateChannelName,
        getChannel,
        updateRole
       } from "../controller/channel.controller.js"
import { auth } from "../middleware/auth.js";
const router = express.Router();
//Creating an channel
router.post("/:serverId/create" ,auth , createChannel )

//Delete channel 
router.delete("/:channelId/delete" ,auth , deleteChannel )

//Update channel name 
router.put("/:channelId/ucn" ,auth, updateChannelName)

router.put("/:channelId/updaterole" , auth , updateRole);
//Get channel
router.get("/:serverId/channel" ,auth, getChannel)
export default router;
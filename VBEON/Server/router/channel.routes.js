import express from "express";
import {createChannel,
        deleteChannel,
        updateChannelName,
        getChannel
       } from "../controller/channel.controller.js"
import { auth } from "../middleware/auth.js";
const router = express.Router();
//Creating an channel
router.post("/:serverId/create" ,auth , createChannel )

//Delete channel 
router.delete("/:channelId/delete" ,auth , deleteChannel )

//Update channel name 
router.put("/:channelId/ucn" ,auth, updateChannelName)
export default router;

//Get channel
router.get("/:serverId/channel" ,auth, getChannel)
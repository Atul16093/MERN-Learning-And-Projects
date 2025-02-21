import express from "express";
import {createChannel , deleteChannel , updateChannelName, getChannel} from "../controller/channel.controller.js"
const router = express.Router();
//Creating an channel
router.post("/:serverId/create" , createChannel )

//Delete channel 
router.delete("/:channelId/delete" , deleteChannel )

//Update channel name 
router.put("/:channelId/ucn" , updateChannelName)
export default router;

//Get channel
router.get("/:serverId/channel" , getChannel)
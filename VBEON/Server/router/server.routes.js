import express from "express";
import {auth} from "../middleware/auth.js"
import { createServer , joinServer , leave , deleteServer , updateServerName , getServerDetail} from "../controller/server.controller.js";
import { createInvite } from "../controller/Invite.controller.js";
const router = express.Router();

//Creating a server 
router.post("/create-server" , auth , createServer);

//Generate Invite link and enterd that invite link into the database for authentication purpose
router.post("/:serverId/invite" , createInvite);

//InviteCode get from user provided link
router.post("/invite/:inviteCode" , joinServer);

//Leave server
router.delete("/:serverId/leave" , leave)

//Delete Server 
router.delete("/:serverId" , deleteServer);

//Update server name 
router.put("/:serverId/usn" , updateServerName);

//Member detail
router.get("/:serverId" , getServerDetail);
export default router;
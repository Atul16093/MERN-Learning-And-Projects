import express from "express";
import {createChannel} from "../controller/channel.controller.js"
const router = express.Router();

router.post("/:serverId/create" , createChannel )
export default router;
import express from "express";
import {auth} from "../middleware/auth.js"
import { createServer } from "../controller/server.controller.js";
const router = express.Router();

//Creating a server 
router.post("/create-server" , auth , createServer);

export default router;
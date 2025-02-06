import express from "express";
import {showTask , completeTask, completed} from "../controller/usertask.controller.js";
import { userVerification } from "../middleware/auth.js";
const router = express.Router();

router.get("/show" ,userVerification, showTask);
router.get("/complete/:id" ,userVerification, completeTask)
router.get("/completed" ,userVerification, completed)
export default router;
import express from "express";
import {showTask , completeTask, completed} from "../controller/usertask.controller.js";
const router = express.Router();

router.get("/show" , showTask);
router.get("/complete/:id" , completeTask)
router.get("/completed" , completed)
export default router;
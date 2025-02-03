import express from "express";
import { signUp, signUPAction ,userHome } from "../controller/user.controller.js";
const router = express.Router();

router.get("/sign-up" , signUp);
router.post("/sign-up" , signUPAction);
router.get("/userHome", userHome);
export default router;
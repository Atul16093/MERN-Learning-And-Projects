import express from "express";
import { signUp, signUPAction ,userHome , signIn, signInAction } from "../controller/user.controller.js";
const router = express.Router();

router.get("/sign-up" , signUp);
router.post("/sign-up" , signUPAction);
router.get("/sign-in" , signIn);
router.post("/sign-in" , signInAction)
router.get("/home", userHome);
export default router;
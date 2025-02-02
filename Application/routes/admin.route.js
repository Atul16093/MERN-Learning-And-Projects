import express from "express";
import { singInPage , signInAction, dashboardPageAction } from "../controller/admin.controller.js";
import { verify } from "../middleware/auth.js";
//This function return the object of router class.
const router = express.Router();

router.get("/sign-in", singInPage);
router.post("/sign-in" , signInAction);
router.get("/dashboard" ,verify, dashboardPageAction);

export default router; 


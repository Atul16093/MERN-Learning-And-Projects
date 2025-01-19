import express from "express";
import { singInPage , signInAction, dashboardPageAction } from "../controller/admin.controller.js";
//This function return the object of router class.
const router = express.Router();

router.get("/sign-in", singInPage);
router.post("/sign-in" , signInAction);
router.get("/dashboard" , dashboardPageAction);

export default router; 
import express from "express";
import { signInAction, signInPage, logout } from "../controller/admin.control.js";

const router = express.Router();

router.get("/sign-in", signInPage);
router.post("/sign-in", signInAction);
router.get("/log-out" , logout);
export default router;

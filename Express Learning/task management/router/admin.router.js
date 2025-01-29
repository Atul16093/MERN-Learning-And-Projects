import express from "express";
import { signInAction, signInPage } from "../controller/admin.control.js";

const router = express.Router();

router.get("/sign-in" , signInPage)
router.post("/sign-in" , signInAction)
export default router;
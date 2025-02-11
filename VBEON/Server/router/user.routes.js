import express from "express";
import {register , login} from "../controller/user.controller.js"

const router = express.Router();

//signup route
router.post("/register" , register);

//signin route
router.post("/login" , login)

export default router;
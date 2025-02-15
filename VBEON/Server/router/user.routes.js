import express from "express";
import { register , login  , verify , forget , updatePassword} from "../controller/user.controller.js";
// import { auth } from "../middleware/auth.js";
import { OTPVerify } from "../middleware/otpVerification.js";
const router = express.Router();

//signin route
router.post("/login" ,  login)

//signup route
router.post("/register" , register);

//Forget password 
router.post("/forget" , forget , OTPVerify);

//OTP verification 
router.post("/otpverification" , OTPVerify);
//Verify emailAddress
router.post("/verification" , verify , updatePassword);

export default router;
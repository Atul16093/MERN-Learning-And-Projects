import express from "express";
import { register , login  , verify , forget , updatePassword} from "../controller/user.controller.js";
import { OTPVerify } from "../middleware/otpVerification.js";
const router = express.Router();

//signin route
router.post("/login" ,  login)

//signup route
router.post("/register" , register);

//Forget password 
router.post("/forget" , forget);

//OTP verification 
router.post("/email-verification" , verify );

//Verify user for updating Password
router.post("/otp-update-pass" , OTPVerify);

//update password /set password
router.post("/update-password" , updatePassword);


export default router;
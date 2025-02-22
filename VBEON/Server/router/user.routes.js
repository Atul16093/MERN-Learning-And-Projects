import express from "express";
import {body} from "express-validator";
import { register , login  , verify , forget , updatePassword , getDetail} from "../controller/user.controller.js";
import { OTPVerify } from "../middleware/otpVerification.js";
const router = express.Router();

//signin route
router.post("/login" ,  login)

//signup route
//Whenever we use multiple validation so we need to put all the validation inside an array otherwise only last will work
router.post("/register",[
    body("username", "Username is required").notEmpty(),
    body("email","Invalid Email ID").isEmail(),
    body("password" , "Password is Required").notEmpty(),
    body("password" , "password length should be between 8 to 16 character").isLength({min : 8 , max : 16}),
    body("dob" , "Date of birth is required").notEmpty()],
    register);

//Forget password 
router.post("/forget-password" ,
     body("email", "Invalid Email ID").isEmail(),
     forget);

//OTP verification 
router.post("/email-verification", verify );

//Verify user for updating Password
router.post("/otp-update-pass" , OTPVerify);

//update password /set new password
router.post("/reset-password" ,
    body("password" , "password length should be between 8 to 16").isLength({min : 8 , max : 16}),
     updatePassword);

//ge userdetail by the help of id 

router.get("/:id" , getDetail)

export default router;
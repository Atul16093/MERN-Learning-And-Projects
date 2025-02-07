import express from "express";
import { signUp, signUPAction ,userHome , signIn, signInAction, logout} from "../controller/user.controller.js";
import { userVerification } from "../middleware/auth.js";
import { body } from "express-validator";
const router = express.Router();

router.get("/sign-up" , signUp);
router.post("/sign-up" ,body("email" ,"email is invalid").isEmail(),
body("email" , "email is required").notEmpty(),
body("password" , "password is required").notEmpty(),
body("password" , "password length should be between 6 to 10").isLength({min : 6 , max : 10}), signUPAction);
router.get("/sign-in" , signIn);
router.post("/sign-in" , signInAction)
router.get("/home",userVerification, userHome);
router.get("/log-out" ,userVerification, logout);
export default router;
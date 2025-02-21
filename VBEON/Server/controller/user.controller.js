import User from "../models/user.model.js";
//This must be imported for creating a connection  with the database
import bcrypt from "bcryptjs";
//importing helper class
import Helper from "../Helper/Helper.js";
//importing templete class for send OTP with some already written text
import Templete from "../utils/templete.js";
//importing a JWT token class
import JwtToken from "../utils/JwtToken.js";
import jwt from "jsonwebtoken";

//signup controller
export const register = async (request, response, next) => {
  try {
    let { username, email, password } = request.body;
    // console.log(username , email, password);
    let emailStatus = await User.findOne({email});
    if(emailStatus){
      return response.status(400).json({message : "User alredy exist"});
    }
    //Ecrypting the password
    let saltKey = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, saltKey);

    const helper = new Helper();
    const OTP = helper.generateOtp(4);

    // Creating a collection by using create command
    await User.create({ username, email, password, OTP });

    // carring email inside the token
    let token = new JwtToken();
    let emailToken = token.tokenGenerate(email);
    response.cookie("emailVerifyToken", emailToken);
    let data = {
      OTP: OTP,
      year: new Date().getFullYear(),
      appName: "VBEON",
      name: username,
      email: email,
      subject: "OTP FOR PASSWORD RESET",
    };
    // console.log(data);

    const templateData = new Templete().getOtpTemplete(data);
    helper.sendMail(data, templateData);

    //After the registration, a form will open to verify the email of the user by using get route

    response.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log("error in register controller", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (request, response, next) => {
  try {
    let { email, password } = request.body;
    // console.log(email , password);

    let emailStatus = await User.findOne({ email });
    //User authecation
    if (emailStatus && emailStatus.OTP == null) {
      let encrypted = emailStatus.password;
      let status = bcrypt.compareSync(password, encrypted);
      if (status) {
        let token = new JwtToken();
        let email = emailStatus.email;
        let data = token.tokenGenerate(email);
        // console.log(data);
        response.cookie("token", data);
        let id = emailStatus._id;
        let info = token.idToken(id);
        response.cookie("id", info);
        return response.status(200).json({ message: "Login successfully " });
      } else {
        return response.status(400).json({ message: "Invalid credintial" });
      }
    } else {
      return response.status(400).json({ message: "Invalid credintial" });
    }
  } catch (error) {
    console.log("error in login controller", error);

    return response.status(500).json({ message: "Internal server error" });
  }
};

//Verification route  ON the time of registration, is the email valid or not ?

export const verify = async (request, response, next) => {
  try {
    let { OTP } = request.body;
    let email = jwt.verify(request.cookies.emailVerifyToken, "secreat");
    let mail = email.data;

    //check is email and OTP both are same or not, here we carry mail data by the help of token
    let status = await User.findOne({ OTP, email: mail });
    if (status) {
      //Updating the status value null
      await User.updateOne({ email: status.email }, { $set: { OTP: null } });
      return response.status(200).json({
        message: "User register successfully (redirect to the login page )",
      });
    } else {
      return response
        .status(400)
        .json({ message: "Incorrect OTP Register Again" });
    }
  } catch (error) {
    console.log("Error in verfiy controller", error);

    return response.status(500).json({ message: "Internal server error" });
  }
};

//Forget password router whenever user click on forget password this api request will trigger
export const forget = async (request, response, next) => {
  try {
    const { email } = request.body;
    let status = await User.findOne({ email });

    if (status) {
      const helper = new Helper();
      const OTP = helper.generateOtp(6);
      let token = new JwtToken();
      //Stroing otp inside the token for matching
      let OTPCookie = token.OTPToken(OTP);

      //I want this email cookie for updating a password of particular user
      let emailCookie = token.tokenGenerate(status.email);
      // console.log(emailCookie);
      response.cookie("emailToken", emailCookie);
      // console.log(OTPCookie);
      response.cookie("OTPToken", OTPCookie);
      let data = {
        OTP: OTP,
        year: new Date().getFullYear(),
        appName: "VBEON",
        name: status.username,
        email: status.email,
        subject: "OTP FOR PASSWORD RESET",
      };
      const templateData = new Templete().getOtpTemplete(data);
      helper.sendMail(data, templateData);
      return response.status(200).json({ message: "OTP sent successfully" });
    }
  } catch (error) {
    console.log("Error in forget controller", error);
    return response.status(500).json({ message: "Internal server error  " });
  }
};

//password updating router
export const updatePassword = async (request, response, next) => {
  try {
    //Now here a passoword updation window will open
    const { newPassword } = request.body;
    let email = jwt.verify(request.cookies.emailToken, "secreat");
    let status = await User.findOne({ email: email.data });
    if (status) {
      let salt = bcrypt.genSaltSync(10);
      let encrypted = bcrypt.hashSync(newPassword, salt);
      await User.updateOne(
        { _id: status._id },
        { $set: { password: encrypted } }
      );
      return response
        .status(201)
        .json({ message: "Password updated succesfully " });
    } else {
      return response.status(400).josn({ message: error.message });
    }
  } catch (error) {
    console.log("Error in reset password ", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

export const getDetail = async (request, response, next) => {
  try {
    let { id } = request.params;
    let detail = await User.findOne({ _id: id });

    if (!detail) {
      return response.status(400).json({ message: "User not found" });
    }
    return response.status(200).json({ message: "Successfull", detail });
  } catch (error) {
    console.log("error in getDetail controller", error);
    return response.status(500).json({ message: "Internal server error" });
  }
};

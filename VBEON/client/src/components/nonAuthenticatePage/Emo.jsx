import { useRef, useState, useEffect} from "react";
import "./Emo.css"
import axios from "axios";
import api from "../../api.jsx";
import Cookies from "js-cookie";
const Emo = ()=>{
  //Count the step for tracking the user action
    const [step , setStep] = useState(0);
    const [chatHistory , setChatHistory] = useState([
        {sender : "Emo" , text : "Greetings! May I know the name behind that awesome personality ? "}
    ]);
    const [userData , setUserData] = useState({
        username : "",
        email    : "",
        dob      : "",
        status   : "",
        password : "",
        OTP      : ""
    })

    //This array will help us , to setting the data into userData object
    const userKeys = ["username", "email", "dob", "status", "password"];

    let userInputRef = useRef();
    //Chat container ref will help us to scroll chat automatically
    let chatContainerRef = useRef();

    const steps = [
        "Greetings! May I know the name behind that awesome personality?",
        "What's the email address where you'd like to receive updates and cool surprises?",
        "Could you share your birthday so we can celebrate you in style?",
        "How would you like to show up? Are you online, offline, idle, or in Do Not Disturb mode?",
        "Time to lock things down! Create a password that only you know.",
        "Please Enter your OTP for verify the email."
    ]
//Validating the password in the function
    function validatePassword(password){
      if(password.length < 8 || password.length >16){
        return false;
      }
      let hasLower = false ;
      let hasUpper = false;
      let hasDigit = false;
      let hasSpecial = false;
      const specialCharacters = "!@#$%^&*()_+[]{}|;':\",.<>/?";
      for(let char of password){
        if(char >= 'a' && char <= 'z'){
            hasLower = true;
        } else if (char >= 'A' && char <= 'Z') {
          hasUpper = true;
        } else if (char >= '0' && char <= '9') {
          hasDigit = true;
        } else if (specialCharacters.includes(char)) {
          hasSpecial = true;
        }
      }
      return hasLower && hasUpper && hasDigit && hasSpecial;
    }

    //Checking the validation of user messages 
    const validateInput = (field , value)=>{
      if(field === "email"){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(value)){
          return "Please enter a valid email address."
        }
      }
      if(field === "password"){
        if(!validatePassword(value)){
          return "Password must contain one lowercase , one uppercase , one special character and one number "
        }
      }
      if (field === "dob") {
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dobRegex.test(value)) {
          return "Date of birth must be in YYYY-MM-DD format.";
        }
      }
      return "";
    }
    
    //This function will run after the each response of user 
    const sendMessage = ()=>{
        let mess = userInputRef.current.value;
        if(!mess) return;
        if (step === userKeys.length) {
          // Append user's OTP message.
          setChatHistory((prev) => [...prev, { sender: "user", text: mess }]);
          // Update OTP in userData.
          setUserData((prev) => ({ ...prev, OTP: mess }));
          userInputRef.current.value = "";
          // Advance to the next step (step 6) to trigger OTP verification.
          setStep(steps.length);
          return;
        }
        const currentField = userKeys[step];
        const error = validateInput(currentField , mess);

        if(error){
          setChatHistory(prev =>[...prev , {sender : "assistant" , text : error}]);
          return;
        }



        setChatHistory([...chatHistory , {sender : "user" , text : mess}]); 

        setUserData(prev => ({ ...prev, [userKeys[step]]: mess }));
      
        
        userInputRef.current.value = "";
        let nextStep =step + 1;
        setStep(nextStep);
        if (nextStep < steps.length) {
            setChatHistory(prev => [
              ...prev,
              { sender: "assistant", text: steps[nextStep] }
            ]);
          }else if(steps.length == 5){
            setChatHistory(prev => [
              ...prev,
              { sender: "assistant", text: "Registration complete!" }
            ]);
            setStep(steps.length)
          }else if(steps.length == 6){
            setChatHistory(prev =>[
              ...prev , {sender : "assistant" , text : steps[nextStep]}
            ])
          }
        };
        //For scrolling at the bottom of the chat 
        useEffect(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        }, [chatHistory]);

        useEffect(() => {          
          if (step === userKeys.length) {            
            const register = async () => {
              try {
                const res = await axios.post(api.REGISTER, {
                  username: userData.username,
                  email: userData.email,
                  password: userData.password,
                  status: userData.status,
                  dob: userData.dob
                });
                console.log("Registration successful:", res.data);

                //Here we're getting the token from the backend and set that token into the cookies 
                
                const emailToken = res.data.user.emailVerifyToken;
                console.log(emailToken);
                
                if (emailToken) {
                  Cookies.set("emailVerifyToken", emailToken, { expires: 7, path: "/" });
                }
              } catch (err) {
                console.log("Error in Emo.jsx register function", err);
              }
            };
            register();
          }else if (step == steps.length){
            console.log("Hello");
            
            const verifyEmail = async ()=>{
              try{
                console.log("verifyEmail" , userData , userData.OTP);
                
                const res = await axios.post(api.EMAILVERIFICATION , {
                  OTP : userData.OTP,
                },{ withCredentials: true });
                
                setChatHistory((prev) => [
                  ...prev,
                  { sender: "assistant", text: res.data.message || "Email verified successfully!" }
                ]);
                
              }catch(err){
                console.log("Error in verifyOtp fucntion" , err);
                const errorMsg =
                err.response?.data?.message || "Incorrect OTP. Please try again.";
              setChatHistory((prev) => [
                ...prev,
                { sender: "assistant", text: errorMsg }
              ]);
              // Reset the step to re-prompt OTP entry.
              setStep(userKeys.length);
              }
            }
            verifyEmail();
          }
        }, [step, userData, steps.length]);
        
    return <>
     <div className="glass-bg">
        <header className="glass-header">
          <h1 className="signup-btn">Emo</h1>
          <button className="signup-btn">Sign Up with Ease!</button>
        </header>
      <div className="glass-container">
        <div className="glass-content" ref={chatContainerRef}>
        {chatHistory.map((msg , index)=>{ return <div key={index} className={`assistant-bubble ${msg.sender === "user" ? "user" : ""}`}> 
            <p>{msg.text} </p>
        </div>
    })}

         </div>
        <div className="message-input">
          <input  onKeyDown={(e)=>{
            if(e.key === "Enter"){
                sendMessage();
            }
          }} ref={userInputRef} type="text" placeholder="Message..." />
          <button onClick={()=>{sendMessage()}} className="send-btn">&#x27A4;</button>
        </div>
      </div>
    </div>
    </>
}
export default Emo;
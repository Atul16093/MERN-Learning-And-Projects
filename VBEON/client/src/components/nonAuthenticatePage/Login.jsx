import { useRef, useState, useEffect} from "react";
import "./Emo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api.jsx";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/UserSlice.jsx";
const Login = () => {

    const dispatch = useDispatch();

    const [step , setStep] = useState(0);
    const [chatHistory , setChatHistory] = useState([
        {sender : "Emo" , text : "Greetings, friend! 👋 I'm excited to have you back. Please enter your email address so I can recognize you"}
    ]);

    const[userData , setUserData] = useState({
        email : "",
        password : ""
    })

    const userKeys = ["email" , "password"];
    const steps = [
        "Greetings, friend! 👋 I'm excited to have you back. Please enter your email address so I can recognize you",
        "Great, I've got your email! Now, could you please type in your secret password to unlock your chat universe? Your privacy is my top priority!"
    ]
    // Ref declartion 
    const userInputRef     = useRef();
    const chatContainerRef = useRef();

    //hook for navigation 
    const navigate = useNavigate();
    const signUp = ()=>{
        navigate("/emo");
    }

    //Validation of input 
    const validateInput  = (field  , value)=>{
        
        if(field === "email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value)){
                return "Please enter a valid email address."
              }
        }
    }

    const sendMessage = ()=>{
        let mess = userInputRef.current.value;
        if(!mess) return;
        setChatHistory([...chatHistory , {sender : "user" , text : mess}]);
        const error = validateInput(userKeys[step] , mess);
        
        if(error){
            setChatHistory(prev=> [...prev , {sender : "emo" , text : error}]);
            return
        }

        setUserData(prev => ({ ...prev, [userKeys[step]]: mess })); 

        userInputRef.current.value = "";
        let nextStep = step+1;

        if(nextStep < steps.length){
            setChatHistory(prev => [
                ...prev,
                { sender: "assistant", text: steps[nextStep] }
              ]);
              setStep(nextStep);
        }else{
            setStep(nextStep);
        }
    }

            useEffect(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
              }
              
            }, [chatHistory]);

            useEffect(()=>{
                if(step == userKeys.length){
                    const login = async ()=>{
                        try{
                            const res = await axios.post(api.LOGIN , {
                                email : userData.email,
                                password : userData.password
                            });
                            /*
                            const mailToken = res.data.user.mailToken;
                            if(mailToken){
                                Cookies.set("mailToken" , mailToken , {expires : 7 , path : "/"});
                            }
                            const userId = res.data.user.userId;
                            if(userId){
                                Cookies.set("userId" , userId , {expires : 7 , path : "/"});
                            }
                            */
                          //  console.log(res.data.message);
                          Cookies.set("token" , res.data.user.mailToken , {expires : 7 ,secure : false, path : "/"});
                          console.log(Cookies.get("token"));;
                          
                            dispatch(setUser({
                              user : res.data.user,
                              message : res.data.message,
                              token   : res.data.user.mailToken,
                            }));
                          Cookies.set("id", res.data.user.userId , {expires : 7 , path : "/"});
                            setChatHistory((prev) => [
                                ...prev,
                                { sender: "assistant", text: "Login successful!" }
                              ]);
                              toast.success("Login Success...");
                              navigate("/home")
                        }catch(err){
                            toast.error("Invalid Credentials...")
                            console.log("Error in Login function ", err);    
                            const errorMsg =
                            err.response.data.message ||
                            "Login failed. Please check your email and password.";
                          setChatHistory((prev) => [
                            ...prev,
                            { sender: "assistant", text: errorMsg }
                          ]);
                          setStep(0);
                        }
                    }
                    login();
                }
            } , [step, userData, steps.length]);
    
  return <> 
         <ToastContainer/>
         <div className="glass-bg">
        <header className="glass-header">
          <h1 className="signup-btn">Emo</h1>
          <button onClick={signUp} className="signup-btn">SignUp</button>
        </header>
      <div className="glass-container">
        <div className="glass-content" ref={chatContainerRef}>
        {chatHistory.map((msg , index)=>{ return <div key={index} className={`assistant-bubble ${msg.sender === "user" ? "user" : ""}`}> 
            <p style={{color : "white"}}>{msg.text} </p>
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

        </>;
};

export default Login;

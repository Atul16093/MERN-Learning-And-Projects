import { useRef, useState, useEffect } from "react";
import "./Emo.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api.jsx";
import Cookies from "js-cookie";

const Login = () => {
  const [step, setStep] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    { sender: "Emo", text: "Greetings, friend! 👋 I'm excited to have you back. Please enter your email address so I can recognize you" }
  ]);

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });

  const userKeys = ["email", "password"];
  const steps = [
    "Greetings, friend! 👋 I'm excited to have you back. Please enter your email address so I can recognize you",
    "Great, I've got your email! Now, could you please type in your secret password to unlock your chat universe? Your privacy is my top priority!"
  ];

  // Ref declarations 
  const userInputRef = useRef();
  const chatContainerRef = useRef();

  // Hook for navigation 
  const navigate = useNavigate();
  const signUp = () => {
    navigate("/emo");
  };

  // Input validation for email.
  const validateInput = (field, value) => {
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }
    return "";
  };

  const sendMessage = () => {
    const mess = userInputRef.current.value;
    if (!mess) return;
    // Append the user's message to the chat.
    setChatHistory((prev) => [...prev, { sender: "user", text: mess }]);
    // Validate input.
    const error = validateInput(userKeys[step], mess);
    if (error) {
      setChatHistory((prev) => [...prev, { sender: "Emo", text: error }]);
      return;
    }
    // Update userData.
    setUserData((prev) => ({ ...prev, [userKeys[step]]: mess }));
    userInputRef.current.value = "";
    let nextStep = step + 1;
    if (nextStep < steps.length) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: steps[nextStep] }
      ]);
      setStep(nextStep);
    } else {
      // Even when nextStep is not less than steps.length, update the step.
      setStep(nextStep);
    }
  };

  // Auto-scroll the chat container to the bottom when chatHistory changes.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Login useEffect: Trigger login once both email and password have been entered.
  useEffect(() => {
    if (step === userKeys.length) {
      const login = async () => {
        try {
          const res = await axios.post(api.LOGIN, {
            email: userData.email,
            password: userData.password
          });
          console.log("Login successful:", res.data);
          // If login is successful, store tokens as needed.
          const mailToken = res.data.user.mailToken;
          if (mailToken) {
            Cookies.set("mailToken", mailToken, { expires: 7, path: "/" });
          }
          const userId = res.data.user.userId;
          if (userId) {
            Cookies.set("userId", userId, { expires: 7, path: "/" });
          }
          setChatHistory((prev) => [
            ...prev,
            { sender: "assistant", text: "Login successful!" }
          ]);
        } catch (err) {
          console.log("Error in Login function:", err);
          // Extract the error message from the response or use a default message.
          const errorMsg =
            err.response?.data?.message ||
            "Login failed. Please check your email and password.";
          // Append the error message to the chat so the user can see it.
          setChatHistory((prev) => [
            ...prev,
            { sender: "assistant", text: errorMsg }
          ]);
        }
      };
      login();
    }
  }, [step, userData, userKeys.length]);

  return (
    <div className="glass-bg">
      <header className="glass-header">
        <h1 className="signup-btn">Emo</h1>
        <button onClick={signUp} className="signup-btn">
          SignUp
        </button>
      </header>
      <div className="glass-container">
        <div className="glass-content" ref={chatContainerRef}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`assistant-bubble ${msg.sender === "user" ? "user" : ""}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            ref={userInputRef}
            type="text"
            placeholder="Message..."
          />
          <button onClick={sendMessage} className="send-btn">
            &#x27A4;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

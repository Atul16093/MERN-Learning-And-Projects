import { useRef, useState, useEffect } from "react";
import "./Emo.css";
import axios from "axios";
import api from "../../api.jsx";
import Cookies from "js-cookie";

const Emo = () => {
  const [step, setStep] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    { sender: "Emo", text: "Greetings! May I know the name behind that awesome personality?" }
  ]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    dob: "",
    status: "",
    password: "",
    OTP: ""
  });

  // Keys for the first five fields only.
  const userKeys = ["username", "email", "dob", "status", "password"];

  const userInputRef = useRef();
  const chatContainerRef = useRef();

  // Steps array: indices 0-4 are for user data; index 5 is the OTP prompt.
  const steps = [
    "Greetings! May I know the name behind that awesome personality?",
    "What's the email address where you'd like to receive updates and cool surprises?",
    "Could you share your birthday so we can celebrate you in style?",
    "How would you like to show up? Are you online, offline, idle, or in Do Not Disturb mode?",
    "Time to lock things down! Create a password that only you know.",
    "Please enter your OTP to verify the email."
  ];

  // Fix: Use OR instead of AND for password length check.
  function validatePassword(password) {
    if (password.length < 6 || password.length > 16) {
      return false;
    }
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasSpecial = false;
    const specialCharacters = "!@#$%^&*()_+[]{}|;':\",.<>/?";
    for (let char of password) {
      if (char >= "a" && char <= "z") {
        hasLower = true;
      } else if (char >= "A" && char <= "Z") {
        hasUpper = true;
      } else if (char >= "0" && char <= "9") {
        hasDigit = true;
      } else if (specialCharacters.includes(char)) {
        hasSpecial = true;
      }
    }
    return hasLower && hasUpper && hasDigit && hasSpecial;
  }

  const validateInput = (field, value) => {
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address.";
      }
    }
    if (field === "password") {
      if (!validatePassword(value)) {
        return "Password must contain one lowercase, one uppercase, one special character and one number.";
      }
    }
    return ""; // No error.
  };

  const sendMessage = () => {
    const mess = userInputRef.current.value.trim();
    if (!mess) return;

    // If we are at the OTP step (step === 5), update the OTP field.
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

    // For fields covered by userKeys.
    const currentField = userKeys[step];
    const error = validateInput(currentField, mess);
    if (error) {
      setChatHistory((prev) => [...prev, { sender: "assistant", text: error }]);
      return;
    }

    // Append the user's message.
    setChatHistory((prev) => [...prev, { sender: "user", text: mess }]);
    // Update the corresponding field in userData.
    setUserData((prev) => ({ ...prev, [currentField]: mess }));
    userInputRef.current.value = "";

    // Advance to the next step.
    const nextStep = step + 1;
    setStep(nextStep);
    // Append the assistant's next prompt if available.
    if (nextStep < steps.length) {
      setChatHistory((prev) => [...prev, { sender: "assistant", text: steps[nextStep] }]);
    }
  };

  // Auto-scroll the chat container to the bottom when chatHistory changes.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Trigger registration or OTP verification based on the step.
  useEffect(() => {
    // Registration API call should happen when step equals the number of fields (5).
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
          // Get the email verification token from the response.
          const emailToken = res.data.user.emailVerifyToken;
          console.log("Email verification token:", emailToken);
          if (emailToken) {
            Cookies.set("emailVerifyToken", emailToken, { expires: 7, path: "/" });
          }
        } catch (err) {
          console.log("Error in register function:", err);
        }
      };
      register();
    } else if (step === steps.length) {
      // OTP verification when step equals steps.length (6).
      const verifyEmail = async () => {
        try {
          console.log("Verifying email with OTP:", userData.OTP);
          const res = await axios.post(
            api.EMAILVERIFICATION,
            { OTP: userData.OTP },
            { withCredentials: true }
          );
          console.log("OTP verification response:", res.data);
        } catch (err) {
          console.log("Error in verifyEmail function:", err);
        }
      };
      verifyEmail();
    }
  }, [step, userData, steps.length]);

  return (
    <div className="glass-bg">
      <header className="glass-header">
        <h1 className="signup-btn">Emo</h1>
        <button className="signup-btn">Sign Up with Ease!</button>
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
              if (e.key === "Enter") {
                sendMessage();
              }
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

export default Emo;

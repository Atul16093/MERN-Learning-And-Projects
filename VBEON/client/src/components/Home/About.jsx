import React from "react";
import "./Common.css"
const About = () => {
  return (
    <div className="about-container">
      <h1>Welcome to VBeon</h1>
      <p>
        <strong>VBeon</strong> is your go-to platform for **real-time communication**. 
        Whether you're gaming, collaborating, or just chilling with friends, we provide **seamless voice, video, and text chat**.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h2>What We Offer</h2>
          <p>
            🎙️ **Voice & Video Calls**  
            💬 **Instant Messaging & Media Sharing**  
            🌍 **Community-Driven Spaces**  
          </p>
        </div>
        <div className="about-box">
          <h2>Why Choose Us?</h2>
          <p>
            🔐 **Privacy First** - Secure & encrypted communication  
            🎨 **Customizable Themes** - Personalize your experience  
            ⚡ **Fast & Reliable** - Built for high performance  
          </p>
        </div>
        <div className="about-box">
          <h2>Our Mission</h2>
          <p>
            To build a **next-gen communication hub** that connects people across the globe, effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

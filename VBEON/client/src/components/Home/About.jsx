import React from "react";
import "./Common.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>Welcome to VBeon</h1>
      <p>
        <strong>VBeon</strong> is a **real-time chat platform** designed for seamless communication.  
        Whether you're collaborating, discussing, or hanging out with friends, our platform keeps conversations organized and secure.
      </p>

      <div className="about-grid">
        <div className="about-box">
          <h2>What We Offer</h2>
          <p>
            💬 **Instant Messaging** - Stay connected with fast and reliable text chat  
            🔒 **Private Channels** - Create exclusive spaces for selected members  
            ✨ **Join via Code** - Instantly join servers using an invite code  
          </p>
        </div>
        <div className="about-box">
          <h2>Why Choose Us?</h2>
          <p>
            🔐 **Privacy First** - Only selected members can access private channels  
            🌍 **Community-Driven** - Build and manage your own chat servers  
            ⚡ **Efficient & Secure** - Designed for a smooth chatting experience  
          </p>
        </div>
        <div className="about-box">
          <h2>Our Mission</h2>
          <p>
            To create a **next-gen chat platform** that prioritizes privacy, security, and easy access for all users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

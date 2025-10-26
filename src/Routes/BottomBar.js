// src/Routes/BottomBar.js
import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../css/BottomBar.css";

function BottomBar() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mikepanaiotti@gmail.com");
    alert("Email copied to clipboard!");
  };

  return (
    <>
      <p className="footer-links">
        <strong>Contact:</strong>{" "}
        <a
          href="https://www.linkedin.com/in/mike-panaiotti-baa41b1a1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />LinkedIn
        </a>{" "}
        •{" "}
        <button onClick={handleCopyEmail} className="email-btn">
          <FaEnvelope /> Email
        </button>
      </p>
    </>
  );
}

export default BottomBar;

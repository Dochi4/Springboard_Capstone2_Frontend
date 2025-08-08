import React from "react";
import "../css/Loading.css";

function Loading({ context = "Finding Your New Book" }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <p className="loading-text">{context}</p>
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;

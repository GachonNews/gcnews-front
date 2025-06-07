// src/components/PersonIcon.jsx
import React from "react";
import "./PersonIcon.css";

const PersonIcon = ({
  className = "",
  size = 24,
  variant = "default", // default, circle, rounded, gradient
  color = "currentColor",
  isActive = false,
}) => (
  <div
    className={`person-icon-wrapper ${variant} ${
      isActive ? "active" : ""
    } ${className}`}
  >
    <svg
      className="person-icon-svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  </div>
);

export default PersonIcon;

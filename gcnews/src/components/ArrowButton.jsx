// src/components/ArrowButton.jsx
export default function ArrowButton({ onClick, type = "button" }) {
    return (
      <button className="arrow-btn" type={type} onClick={onClick}>
        →
      </button>
    );
  }
  
// src/components/ArrowButton.jsx
<<<<<<< HEAD
export default function ArrowButton({ onClick, type = "button" }) {
    return (
      <button className="arrow-btn" type={type} onClick={onClick}>
        →
      </button>
    );
  }
  
=======
export default function ArrowButton({ type = 'submit', className = '' }) {
  return (
    <button
      type={type}
      className={`arrow-btn ${className}`}  // 'arrow-btn'만 사용
    >
      →
    </button>
  );
}
>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000

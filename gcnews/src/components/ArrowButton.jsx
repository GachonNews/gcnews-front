// src/components/ArrowButton.jsx
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

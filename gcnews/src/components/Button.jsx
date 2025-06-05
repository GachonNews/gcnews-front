// src/components/Button.jsx
export default function Button({ label, onClick }) {
    return (
      <button className="btn" onClick={onClick}>
        {label}
      </button>
    );
  }
  
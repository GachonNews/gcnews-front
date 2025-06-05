// src/components/MessageBox.jsx
export default function MessageBox({ title, message }) {
    return (
      <div className="complete-message">
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    );
  }
  
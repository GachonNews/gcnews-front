// src/components/Input.jsx
export default function Input({ label, type = "text", name, value, onChange }) {
    return (
      <div className="input-group">
        <label className="input-label" htmlFor={name}>{label}</label>
        <input
          className="input-box"
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
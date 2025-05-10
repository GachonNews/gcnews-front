// src/pages/EditProfile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "김가천",
    username: "gcnews",
    email: "gcnews@gachon.ac.kr",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    navigate("/mypage");
  };

  return (
    <div className="edit-container">
      <div className="left-section">
        <div className="profile-card">
          <div className="profile-image" />
          <div className="profile-info">
            <div className="info-row">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="info-row">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="info-row">
              <label>이메일</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button className="profile-button" onClick={handleSubmit}>
              저장
            </button>
          </div>
        </div>
        <button className="side-button">🌙 다크 모드</button>
        <button className="side-button">👤 친구 관리</button>
      </div>

      <div className="divider" />

      <div className="right-section">
        <div className="news-title">✏️ 내 정보 수정</div>
        <ul className="news-list">
          <li className="news-item">
            <span className="arrow">📝</span> 수정 후 저장을 눌러주세요.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditProfile;

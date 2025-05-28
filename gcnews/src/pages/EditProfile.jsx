import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserProfile } from "../apis/users";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialProfile = location.state?.profile;

  const [formData, setFormData] = useState(
    initialProfile || {
      name: "",
      loginId: "",
      email: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createUserProfile(formData);
      navigate("/mypage"); // ✅ navigate 사용 권장 (SPA)
    } catch (error) {
      alert("프로필 저장에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="mypage-container">
      <div className="left-section">
        <div className="profile-card">
          <div className="profile-content">
            <div className="profile-image">
              <div className="user-icon">
                <div className="circle"></div>
                <div className="body"></div>
              </div>
            </div>
            <div className="profile-info">
              <div className="info-row">
                <div className="label">이름</div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>
              <div className="info-row">
                <div className="label">아이디</div>
                <input
                  type="text"
                  name="loginId"
                  value={formData.loginId}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>
              <div className="info-row">
                <div className="label">이메일</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="edit-input"
                />
              </div>
              <button className="profile-button" onClick={handleSubmit}>
                저장
              </button>
            </div>
          </div>
        </div>
        <div className="mode-button">
          <span className="icon">🌙</span> 다크 모드
        </div>
        <div className="friend-button">
          <span className="icon">👤</span> 친구 관리
        </div>
      </div>

      <div className="divider" />

      <div className="right-section">
        <div className="news-title">✏️ 내 정보 수정</div>
        <ul className="news-list">
          <li className="news-item">
            <div className="bullet-container">
              <span className="diamond">◆</span>
              <div className="line"></div>
              <span className="diamond">◆</span>
            </div>
            <span className="news-text">수정 후 저장을 눌러주세요.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditProfile;

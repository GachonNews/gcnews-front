// src/pages/MyPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mypage-container">
      <div className="left-section">
        <div className="profile-card">
          <div className="profile-content">
            <div className="profile-image">
              {/* 사용자 아이콘 */}
              <div className="user-icon">
                <div className="circle"></div>
                <div className="body"></div>
              </div>
            </div>
            <div className="profile-info">
              <div className="info-row">
                <div className="label">이름</div>
                <div className="value">김가천</div>
              </div>
              <div className="info-row">
                <div className="label">아이디</div>
                <div className="value">gcnews</div>
              </div>
              <div className="info-row">
                <div className="label">이메일</div>
                <div className="value">gcnews@gachon.ac.kr</div>
              </div>
              <button
                className="profile-button"
                onClick={() => navigate("/edit")}
              >
                내 정보 확인/수정
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
        <div className="news-title">❤️ 한 달 뉴스 리캡</div>
        <ul className="news-list">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="news-item">
              <div className="bullet-container">
                <span className="diamond">◆</span>
                <div className="line" />
                <span className="diamond">◆</span>
              </div>
              <span className="news-text">
                뉴스 제목이 들어갈 자리입니다 뉴스 제목이 들어갈 자리입니다
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;

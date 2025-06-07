import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../apis/users";
import { fetchRecapData } from "../apis/recap";
import "./MyPage.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [recapData, setRecapData] = useState([]);

  useEffect(() => {
    fetchUserProfile()
      .then((data) => setProfile(data))
      .catch((err) => console.error(err));

    fetchRecapData()
      .then((titles) => {
        console.log("✅ 뉴스 리캡 데이터 가져옴:", titles);
        setRecapData(titles);
      })
      .catch((err) => console.error("❌ 뉴스 리캡 에러:", err.message));
  }, []);

  if (!profile)
    return <div>로딩 중...profile: {JSON.stringify(profile, null, 2)}</div>;

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
                <div className="value">{profile.name}</div>
              </div>
              <div className="info-row">
                <div className="label">아이디</div>
                <div className="value">{profile.loginId}</div>
              </div>
              <div className="info-row">
                <div className="label">이메일</div>
                <div className="value">{profile.email}</div>
              </div>
              <button
                className="profile-button"
                onClick={() => navigate("/edit", { state: { profile } })}
              >
                내 정보 확인/수정
              </button>
            </div>
          </div>
        </div>
        <div className="friend-button" onClick={() => navigate("/calendar")}>
          <span className="icon">📅</span> 활동 캘린더
        </div>
      </div>

      <div className="divider" />

      <div className="right-section">
        <div className="news-title">❤️ 한 달 뉴스 리캡</div>
        <ul className="news-list">
          {recapData.length > 0 ? (
            recapData.map((title, index) => (
              <li key={index} className="news-item">
                <div className="bullet-container">
                  <span className="diamond">◆</span>
                  <div className="line" />
                  <span className="diamond">◆</span>
                </div>
                <span className="news-text">{title}</span>
              </li>
            ))
          ) : (
            <li className="news-item">뉴스 리캡 데이터가 없습니다.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;

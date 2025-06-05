// components/GcNewsHeader.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./GcNewsHeader.css";

const GcNewsHeader = () => {
  const location = useLocation();
  const isMyPage =
    location.pathname.includes("/mypage") ||
    location.pathname.includes("/edit");
  const isNewsPage =
    location.pathname.includes("/news") || location.pathname === "/";

  return (
    <div className="gcnews-header">
      <div className="top-line"></div>
      <div className="header-container">
        {/* 마이페이지에서는 홈 아이콘 표시 */}
        {isMyPage && (
          <Link to="/news" className="nav-icon home-icon">
            🏠
          </Link>
        )}
        <h1 className="logo">GC NEWS</h1>

        {/* 뉴스 페이지에서는 마이페이지 아이콘 표시 */}

        {isNewsPage && (
          <Link to="/mypage" className="nav-icon user-icon">
            👤
          </Link>
        )}
      </div>
      <div className="bottom-line"></div>
    </div>
  );
};

export default GcNewsHeader;

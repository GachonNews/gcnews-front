// layouts/MyPageLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import GcNewsHeader from "../components/GcNewsHeader";
import "./MyPageLayout.css";

const MyPageLayout = () => {
  return (
    <div className="mypage-layout">
      <GcNewsHeader />
      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>버전 정보 V 1.0.1</p>
      </footer>
    </div>
  );
};

export default MyPageLayout;

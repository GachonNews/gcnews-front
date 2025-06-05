// layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import GcNewsHeader from "../components/GcNewsHeader";
import CategoryMenu from "../components/CategoryMenu";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* GC NEWS 헤더 (마이페이지 아이콘 포함) */}
      <GcNewsHeader />

      {/* 카테고리 메뉴 */}
      <CategoryMenu />

      {/* 메인 콘텐츠 */}
      <main className="content">
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="footer">{/* 푸터 내용 */}</footer>
    </div>
  );
};

export default MainLayout;

// src/components/Layout.jsx
import { Outlet, useLocation } from "react-router-dom";
import "../styles/Layout.css";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="layout-wrapper">
      {/* 상단 영역 */}
      <div className="layout-header">
        {!isHome && <span className="layout-title">GC NEWS</span>}
      </div>

      {/* 상단 선 */}
      <div className="border-line top" />

      {/* 메인 콘텐츠 영역 - children 대신 Outlet 사용 */}
      <main className="layout-content">
        <Outlet />
      </main>

      {/* 하단 선 (공통 적용) */}
      <div className="border-line bottom" />
    </div>
  );
}

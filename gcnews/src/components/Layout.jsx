// src/components/Layout.jsx
import { useLocation } from 'react-router-dom';
import '../styles/Layout.css';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="layout-wrapper">
      {/* 상단 영역 */}
      <div className="layout-header">
        {!isHome && <span className="layout-title">GC NEWS</span>}
      </div>

      {/* 상단 선 */}
      <div className="border-line top" />

      {/* 메인 콘텐츠 영역 */}
      <main className="layout-content">
        {children}
      </main>

      {/* 하단 선 (공통 적용) */}
      <div className="border-line bottom" />
    </div>
  );
}

// src/pages/CalendarPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CalendarPage.css';  // 스타일 파일 import

export default function CalendarPage() {
  const navigate = useNavigate();
  
  return (
    <div className="calendar-page-container">
      <h1 className="calendar-page-title">출석률 확인</h1>
      <p className="calendar-page-subtitle">달력에서 활동을 체크하고 출석을 관리하세요.</p>
      <div className="calendar-buttons">
        <button onClick={() => navigate('/mypage')}>마이 페이지</button>
        <button onClick={() => navigate('/news')}>뉴스 보기</button>
      </div>
    </div>
  );
}

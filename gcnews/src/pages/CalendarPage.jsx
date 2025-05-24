<<<<<<< HEAD
import { useOutletContext } from 'react-router-dom';
import Calendar from '../components/Calendar';
import CalendarGrid from '../components/CalendarGrid';

export default function CalendarPage() {
  const { year, month, data, onDateClick, selectedDate } = useOutletContext(); // ✅ 꼭 이렇게

  return (
    <div className="calendar-container">
      <h1 className="calendar-page-title"></h1>
      <Calendar
        year={year}
        month={month}
        data={data}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
      />
    </div>
  );
}
=======
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
>>>>>>> 80a5f2b11ab1b751788e62ad4499435faa7af000

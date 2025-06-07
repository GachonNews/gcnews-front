// src/components/MiniCalendar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./MiniCalendar.css";

const MiniCalendar = () => {
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  // 이번 달 날짜 정보
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // 캘린더 페이지로 이동
  const handleCalendarClick = () => {
    navigate("/calendar");
  };

  // 캘린더 셀 생성
  const generateCalendarCells = () => {
    const cells = [];
    const totalCells = 21; // 3주치만 표시 (3 x 7 = 21)

    // 빈 셀들 (이전 달)
    for (let i = 0; i < startDayOffset && cells.length < totalCells; i++) {
      cells.push(
        <div key={`empty-${i}`} className="mini-calendar-cell empty"></div>
      );
    }

    // 이번 달 날짜들
    for (let day = 1; day <= daysInMonth && cells.length < totalCells; day++) {
      const isToday = day === date;
      cells.push(
        <div
          key={day}
          className={`mini-calendar-cell ${isToday ? "today" : ""}`}
        >
          {day}
        </div>
      );
    }

    // 남은 셀들 채우기
    while (cells.length < totalCells) {
      cells.push(
        <div
          key={`next-${cells.length}`}
          className="mini-calendar-cell empty"
        ></div>
      );
    }

    return cells;
  };

  return (
    <div className="mini-calendar-container" onClick={handleCalendarClick}>
      <div className="mini-calendar-header">
        <span className="calendar-icon">📅</span>
        <span className="calendar-title">{`${year}.${String(month).padStart(
          2,
          "0"
        )}`}</span>
      </div>

      <div className="mini-calendar-weekdays">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <div key={index} className="mini-weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="mini-calendar-grid">{generateCalendarCells()}</div>

      <div className="calendar-footer">
        <span>캘린더 보기</span>
      </div>
    </div>
  );
};

export default MiniCalendar;

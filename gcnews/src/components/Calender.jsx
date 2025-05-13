// src/components/Calendar.jsx
import React from "react";

const Calendar = ({ onDateClick, selectedDate }) => {
  const dates = Array.from({ length: 30 }, (_, i) => i + 1); // 30일짜리 달력 생성

  return (
    <div className="calendar">
      <div className="calendar-grid">
        {dates.map((date) => (
          <div
            key={date}
            className={`calendar-day ${selectedDate === date ? "selected" : ""}`}
            onClick={() => onDateClick(`2025-04-${date < 10 ? `0${date}` : date}`)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

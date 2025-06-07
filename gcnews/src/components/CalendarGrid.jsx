// 📁 src/components/CalendarGrid.jsx
import React from "react";
import EmotionIcon from "./EmotionIcon";

const CalendarGrid = ({ data, onDateClick }) => {
  const days = Object.keys(data || {});

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "1rem",
      }}
    >
      {days.map((date) => (
        <div
          key={date}
          onClick={() => onDateClick(date)}
          style={{ cursor: "pointer" }}
        >
          <EmotionIcon count={data[date].completed} />
          <div style={{ fontSize: "0.75rem" }}>{date}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;

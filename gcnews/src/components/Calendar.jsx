// 📁 src/components/Calendar.jsx
import React from "react";
import EmotionIcon from "./EmotionIcon";

const calendarGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "1px",
  backgroundColor: "#ddd",
  border: "1px solid #ddd",
  width: "100%",
  maxWidth: "650px" /* 캘린더 최대 너비 제한 */,
  margin: "0 auto",
};

const cellStyle = {
  height: "70px" /* 셀 높이를 줄임 */,
  backgroundColor: "#fff",
  padding: "4px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "0.75rem",
  position: "relative",
  overflow: "hidden",
};

const dayLabelStyle = {
  ...cellStyle,
  height: "40px" /* 요일 라벨 높이 줄임 */,
  backgroundColor: "#f0f0f0",
  fontWeight: "bold",
  cursor: "default",
  fontSize: "0.7rem",
  padding: "4px",
  justifyContent: "center",
};

const dateNumberStyle = {
  alignSelf: "flex-end",
  padding: "1px 2px",
  fontSize: "0.7em",
  lineHeight: "1",
};

const selectedCellStyle = {
  ...cellStyle,
  border: "2px solid #007bff",
};

const todayCellStyle = {
  ...cellStyle,
  backgroundColor: "#e6f7ff",
};

const Calendar = ({
  year,
  month,
  setYear,
  setMonth,
  data,
  onDateClick,
  selectedDate,
  today,
}) => {
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const startDayOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const calendarCells = [];

  const todayObj = new Date(today.year, today.month - 1, today.date);

  const handlePrevMonth = () => {
    if (typeof setMonth === "function" && typeof setYear === "function") {
      if (month === 1) {
        setYear(year - 1);
        setMonth(12);
      } else {
        setMonth(month - 1);
      }
      if (typeof onDateClick === "function") onDateClick(null);
    } else {
      console.error("setMonth 또는 setYear prop이 함수가 아닙니다!");
    }
  };

  const handleNextMonth = () => {
    if (typeof setMonth === "function" && typeof setYear === "function") {
      if (month === 12) {
        setYear(year + 1);
        setMonth(1);
      } else {
        setMonth(month + 1);
      }
      if (typeof onDateClick === "function") onDateClick(null);
    } else {
      console.error("setMonth 또는 setYear prop이 함수가 아닙니다!");
    }
  };

  const monthYearDisplay = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        height: "50px" /* 높이 줄임 */,
        marginBottom: "15px" /* 마진 줄임 */,
        flexShrink: 0,
      }}
    >
      <button
        onClick={handlePrevMonth}
        aria-label="이전 달"
        style={{
          fontSize: "16px" /* 버튼 크기 줄임 */,
          padding: "6px 10px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        ◀️
      </button>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>{`${year}. ${String(
        month
      ).padStart(2, "0")}`}</div>
      <button
        onClick={handleNextMonth}
        aria-label="다음 달"
        style={{
          fontSize: "16px" /* 버튼 크기 줄임 */,
          padding: "6px 10px",
          border: "none",
          background: "none",
          cursor: "pointer",
        }}
      >
        ▶️
      </button>
    </div>
  );

  daysOfWeek.forEach((day) => {
    calendarCells.push(
      <div key={day} style={dayLabelStyle}>
        {day}
      </div>
    );
  });

  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(
      <div
        key={`empty-start-${i}`}
        style={{ ...cellStyle, backgroundColor: "#f9f9f9", cursor: "default" }}
      ></div>
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const currentDateObj = new Date(year, month - 1, day);

    const dayDataFromContext = data ? data[dateStr] : null;
    let activitiesCount = 0;
    let showEmotion = false;

    if (currentDateObj <= todayObj) {
      if (
        dayDataFromContext &&
        typeof dayDataFromContext.activitiesCount === "number"
      ) {
        activitiesCount = dayDataFromContext.activitiesCount;
        showEmotion = true;
      } else {
        activitiesCount = 0;
        showEmotion = true;
      }
    }

    let currentCellStyle = { ...cellStyle };
    if (day === today.date && month === today.month && year === today.year) {
      currentCellStyle = { ...currentCellStyle, ...todayCellStyle };
    }
    if (dateStr === selectedDate) {
      currentCellStyle = { ...currentCellStyle, ...selectedCellStyle };
    }

    calendarCells.push(
      <div
        key={dateStr}
        style={currentCellStyle}
        onClick={() =>
          typeof onDateClick === "function" && onDateClick(dateStr)
        }
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showEmotion ? (
            <EmotionIcon count={activitiesCount} />
          ) : (
            <div style={{ height: "1.2rem" }}></div>
          )}
        </div>
        <div style={dateNumberStyle}>{day}</div>
      </div>
    );
  }

  const totalCells = startDayOffset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    calendarCells.push(
      <div
        key={`empty-end-${i}`}
        style={{ ...cellStyle, backgroundColor: "#f9f9f9", cursor: "default" }}
      ></div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center" /* 중앙 정렬 */,
      }}
    >
      {monthYearDisplay}
      <div style={calendarGridStyle}>{calendarCells}</div>
    </div>
  );
};

export default Calendar;

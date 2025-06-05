// CalendarPage.jsx
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Calendar from '../components/Calendar';

export default function CalendarPage() {
  const {
    year,
    month,
    data,
    onDateClick,
    selectedDate,
    setYear,
    setMonth,
    today
  } = useOutletContext();

  return (
    <div className="calendar-container">

      {/* 기존 Calendar 컴포넌트 (변경 없음) */}
      <Calendar
        year={year}
        month={month}
        data={data}
        onDateClick={onDateClick}
        selectedDate={selectedDate}
        setYear={setYear}
        setMonth={setMonth}
        today={today}
      />
    </div>
  );
}

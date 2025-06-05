// 📁 src/components/Calendar.jsx
import React from 'react';
import EmotionIcon from './EmotionIcon';

const calendarGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: '#ddd',
  border: '1px solid #ddd',
  maxWidth: '900px', // 너비 조정
  margin: '0 auto',
};

const cellStyle = {
  height: '100px',
  padding: '5px 3px',
  textAlign: 'center',
  backgroundColor: '#fff',
  minHeight: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '0.8rem',
  position: 'relative',
};

const dayLabelStyle = {
  ...cellStyle,
  height: 'auto',
  minHeight: 'auto',
  padding: '5px',
  backgroundColor: '#f0f0f0',
  fontWeight: 'bold',
  cursor: 'default',
  fontSize: '0.7rem',
};

const dateNumberStyle = {
  alignSelf: 'flex-end',
  padding: '1px 2px',
  fontSize: '0.7em',
};

const selectedCellStyle = {
  ...cellStyle, // 기본 cellStyle을 유지하면서 테두리만 추가
  border: '2px solid #007bff',
};

// ✨ todayCellStyle 정의 추가
const todayCellStyle = {
  ...cellStyle, // 기본 cellStyle을 유지하면서 배경색 변경
  backgroundColor: '#e6f7ff', // 예시: 오늘 날짜 배경색
  // border: '1px solid #91d5ff', // 필요하다면 테두리도 추가
};


const Calendar = ({ year, month, setYear, setMonth, data, onDateClick, selectedDate, today }) => {
  // `setYear`와 `setMonth`가 함수인지 확인하는 로그 (디버깅용)
  // console.log('Calendar props: setYear is function?', typeof setYear === 'function');
  // console.log('Calendar props: setMonth is function?', typeof setMonth === 'function');

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  const startDayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
  const calendarCells = [];

  const todayObj = new Date(today.year, today.month - 1, today.date);

  const handlePrevMonth = () => {
    // setMonth가 함수가 아닐 경우를 대비한 방어 코드 (오류 방지)
    if (typeof setMonth === 'function' && typeof setYear === 'function') {
      if (month === 1) { setYear(year - 1); setMonth(12); } else { setMonth(month - 1); }
      if (typeof onDateClick === 'function') onDateClick(null);
    } else {
      console.error("setMonth 또는 setYear prop이 함수가 아닙니다!");
    }
  };
  const handleNextMonth = () => {
    if (typeof setMonth === 'function' && typeof setYear === 'function') {
      if (month === 12) { setYear(year + 1); setMonth(1); } else { setMonth(month + 1); }
      if (typeof onDateClick === 'function') onDateClick(null);
    } else {
      console.error("setMonth 또는 setYear prop이 함수가 아닙니다!");
    }
  };

  const monthYearDisplay = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
      <button onClick={handlePrevMonth} aria-label="이전 달">◀️</button>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{`${year}. ${String(month).padStart(2, '0')}`}</div>
      <button onClick={handleNextMonth} aria-label="다음 달">▶️</button>
    </div>
  );

  daysOfWeek.forEach(day => {
    calendarCells.push(<div key={day} style={dayLabelStyle}>{day}</div>);
  });
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(<div key={`empty-start-${i}`} style={{ ...cellStyle, backgroundColor: '#f9f9f9', cursor: 'default' }}></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const currentDateObj = new Date(year, month - 1, day);
    
    const dayDataFromContext = data ? data[dateStr] : null;
    let activitiesCount = 0;
    let showEmotion = false;

    if (currentDateObj <= todayObj) {
      if (dayDataFromContext && typeof dayDataFromContext.activitiesCount === 'number') {
        activitiesCount = dayDataFromContext.activitiesCount;
        showEmotion = true;
      } else {
        activitiesCount = 0;
        showEmotion = true;
      }
    }

    let currentCellStyle = { ...cellStyle }; // 기본 셀 스타일로 시작
    // 오늘 날짜 스타일 적용 (selectedDate보다 먼저 확인하여 덮어쓰기 방지 또는 의도적 덮어쓰기)
    if (day === today.date && month === today.month && year === today.year) {
      currentCellStyle = { ...currentCellStyle, ...todayCellStyle };
    }
    // 선택된 날짜 스타일 적용 (오늘 날짜 스타일 위에 덮어쓸 수 있음)
    if (dateStr === selectedDate) {
      currentCellStyle = { ...currentCellStyle, ...selectedCellStyle };
    }


    calendarCells.push(
      <div
        key={dateStr}
        style={currentCellStyle}
        onClick={() => typeof onDateClick === 'function' && onDateClick(dateStr)}
      >
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {showEmotion ? <EmotionIcon count={activitiesCount} /> : <div style={{height: '1.2rem'}}></div>}
        </div>
        <div style={dateNumberStyle}>{day}</div>
      </div>
    );
  }

  const totalCells = startDayOffset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    calendarCells.push(<div key={`empty-end-${i}`} style={{ ...cellStyle, backgroundColor: '#f9f9f9', cursor: 'default' }}></div>);
  }

  return (
    <div>
      {monthYearDisplay}
      <div style={calendarGridStyle}>
        {calendarCells}
      </div>
    </div>
  );
};

export default Calendar;
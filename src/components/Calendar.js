// src/components/Calendar.js
import React from 'react';
import EmotionIcon from './EmotionIcon';

const calendarGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '1px',
  backgroundColor: '#ddd', // 그리드 라인 색상
  border: '1px solid #ddd',
  maxWidth: '500px', // 스크린샷과 유사한 너비
  margin: '0 auto', // 가운데 정렬
};

const cellStyle = {
  padding: '10px 5px',
  textAlign: 'center',
  backgroundColor: '#fff',
  minHeight: '70px', // 셀 높이
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

const dayLabelStyle = {
  ...cellStyle,
  minHeight: 'auto',
  padding: '8px 5px',
  backgroundColor: '#f0f0f0',
  fontWeight: 'bold',
  cursor: 'default',
};

const dateNumberStyle = {
  alignSelf: 'flex-end', // 날짜를 오른쪽 하단으로
  padding: '2px 4px',
  fontSize: '0.8em',
};

const selectedCellStyle = {
  ...cellStyle,
  border: '2px solid #007bff', // 스크린샷의 파란색 테두리
  // backgroundColor: '#e0efff', // 스크린샷의 파란색 배경 (선택 사항)
};


const Calendar = ({ year, month, data, onDateClick, selectedDate }) => {
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); // 0 (Sun) - 6 (Sat)

  // getDay()는 일요일=0, 월요일=1, ..., 토요일=6을 반환합니다.
  // MON을 시작으로 하려면 조정이 필요합니다. (0: 월요일 ... 6: 일요일)
  const startDayOffset = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

  const calendarCells = [];

  // Month and Year display
  const monthYearDisplay = (
    <div style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', margin: '20px 0' }}>
      {`${year}. ${String(month).padStart(2, '0')}`}
    </div>
  );

  // Day labels
  daysOfWeek.forEach(day => {
    calendarCells.push(<div key={day} style={dayLabelStyle}>{day}</div>);
  });

  // Empty cells for days before the first day of the month
  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(<div key={`empty-${i}`} style={{...cellStyle, backgroundColor: '#f9f9f9', cursor: 'default'}}></div>);
  }

  // Date cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = data[dateStr];
    const emotionLevel = dayData ? dayData.emotionLevel : 0; // 데이터 없으면 기본 감정
    
    // 스크린샷의 25일에 파란 동그라미 아이콘 처리를 위한 조건 (임시)
    // 실제로는 사용자의 현재 위치나 특정 상태에 따라 적용해야 함
    const isUserIndicatorDay = dateStr === '2025-04-25'; 

    calendarCells.push(
      <div
        key={dateStr}
        style={dateStr === selectedDate ? selectedCellStyle : cellStyle}
        onClick={() => onDateClick(dateStr)}
      >
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center' }}>
          {dayData || emotionLevel > 0 ? ( // 데이터가 있거나 감정 레벨이 0 초과일 때만 아이콘 표시
             <EmotionIcon count={emotionLevel} />
          ) : (
            isUserIndicatorDay && <span style={{fontSize: '1.5rem'}}>👤</span> // 예시: 25일에 사용자 아이콘
          )}
        </div>
        <div style={dateNumberStyle}>{day}</div>
      </div>
    );
  }

  // Empty cells for days after the last day of the month (to fill the grid)
  const totalCells = startDayOffset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
     calendarCells.push(<div key={`empty-end-${i}`} style={{...cellStyle, backgroundColor: '#f9f9f9', cursor: 'default'}}></div>);
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
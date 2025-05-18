// 📁 src/components/Calendar.jsx
import React from 'react';
import EmotionIcon from './EmotionIcon'; // EmotionIcon import 유지

const calendarGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    backgroundColor: '#ddd',
    border: '1px solid #ddd',
    maxWidth: '500px',
    margin: '0 auto',
};

const cellStyle = {
    padding: '10px 5px',
    textAlign: 'center',
    backgroundColor: '#fff',
    minHeight: '70px',
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
    alignSelf: 'flex-end',
    padding: '2px 4px',
    fontSize: '0.8em',
};

const selectedCellStyle = {
    ...cellStyle,
    border: '2px solid #007bff',
};

const Calendar = ({ year, month, data, onDateClick, selectedDate }) => {
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
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

    // Empty cells
    for (let i = 0; i < startDayOffset; i++) {
        calendarCells.push(<div key={`empty-${i}`} style={{ ...cellStyle, backgroundColor: '#f9f9f9', cursor: 'default' }}></div>);
    }

    // Date cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayData = data ? data[dateStr] : null; // data가 null or undefined일 경우 처리
        const emotionLevel = dayData ? dayData.emotionLevel : 0;

        calendarCells.push(
            <div
                key={dateStr}
                style={dateStr === selectedDate ? selectedCellStyle : cellStyle}
                onClick={() => onDateClick(dateStr)}
            >
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {dayData ? (
                        <EmotionIcon count={emotionLevel} />
                    ) : null}
                </div>
                <div style={dateNumberStyle}>{day}</div>
            </div>
        );
    }

    // Empty cells at the end
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
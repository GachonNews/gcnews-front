import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GcNewsHeader from '../components/GcNewsHeader';
import FriendList from '../components/FriendList';
import ActivityDetail from '../components/ActivityDetail';
import './CalendarLayout.css';

const CalendarLayout = () => {
  const currentDate = new Date(); // 여기로 이동
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [selectedFriend, setSelectedFriend] = useState('me');
  const [selectedDate, setSelectedDate] = useState(null);

  const mockData = {
    me: {
      '2025-05-01': { emotionLevel: 2, detail: ['뉴스 보기', '퀴즈'] },
      '2025-05-02': { emotionLevel: 3, detail: ['뉴스 보기', '퀴즈', '복습'] },
    },
    민수: {
      '2025-05-01': { emotionLevel: 1, detail: ['뉴스 보기'] },
    },
  };

  const data = mockData[selectedFriend] || {};
  const calendarData = Object.keys(data).reduce((acc, date) => {
    acc[date] = { emotionLevel: data[date].emotionLevel };
    return acc;
  }, {});

  return (
    <div className="calendar-layout">
      <GcNewsHeader />
      <main className="calendar-main-content">
        <div className="calendar-left-section">
          <Outlet context={{
            year,
            month,
            data: calendarData,
            selectedDate,
            onDateClick: setSelectedDate,
            setYear,
            setMonth
          }} />
        </div>

        <div className="calendar-right-section">
          <FriendList friends={Object.keys(mockData)} onSelect={setSelectedFriend} />
          {selectedDate && data[selectedDate] && (
            <ActivityDetail date={selectedDate} activities={data[selectedDate].detail} />
          )}
        </div>
      </main>
      <footer className="calendar-footer">
        <p>버전 정보 V 1.0.1</p>
      </footer>
    </div>
  );
};

export default CalendarLayout;
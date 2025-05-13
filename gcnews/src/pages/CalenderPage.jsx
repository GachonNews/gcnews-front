// src/pages/CalendarPage.jsx
import React, { useState } from 'react';
import './CalendarPage.css';
import Calendar from '../components/Calendar';
import FriendList from '../components/FriendList';
import ActivityDetail from '../components/ActivityDetail';
import { useNavigate } from 'react-router-dom';

const DEFAULT_ACTIVITIES = [
  { id: 'news_reading', text: '뉴스 읽기', completed: false },
  { id: 'summary_reading', text: '요약 읽기', completed: false },
  { id: 'quiz_solving', text: '퀴즈 풀기', completed: false },
];

const initialMockData = {
  '2025-04-18': { activities: [...DEFAULT_ACTIVITIES], emotionLevel: 1 },
};

export default function CalendarPage() {
  const navigate = useNavigate();
  const [mockData, setMockData] = useState(initialMockData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState('me');

  const handleDateClick = (dateStr) => {
    setSelectedDate(dateStr);
  };

  const handleToggleActivity = (activityId) => {
    setMockData((prevState) => {
      const newMockData = { ...prevState };
      const dayData = newMockData[selectedDate];

      if (dayData) {
        const updatedActivities = dayData.activities.map((activity) =>
          activity.id === activityId
            ? { ...activity, completed: !activity.completed }
            : activity
        );

        const emotionLevel = calculateEmotionLevel(updatedActivities);
        newMockData[selectedDate] = {
          activities: updatedActivities,
          emotionLevel,
        };
      }

      return newMockData;
    });
  };

  const calculateEmotionLevel = (activities) => {
    const completedCount = activities.filter((act) => act.completed).length;
    if (completedCount === 3) return 3;
    if (completedCount === 2) return 2;
    if (completedCount === 1) return 1;
    return 0;
  };

  const activitiesForSelectedDate = mockData[selectedDate]?.activities || DEFAULT_ACTIVITIES;

  return (
    <div className="calendar-page">
      <h1>출석을 확인하세요</h1>
      <div className="calendar-buttons">
        <button onClick={() => navigate('/mypage')}>마이페이지</button>
        <button onClick={() => navigate('/news')}>뉴스</button>
      </div>
      <div className="calendar">
        <Calendar onDateClick={handleDateClick} selectedDate={selectedDate} />
      </div>
      <div className="sidebar">
        <FriendList selectedFriend={selectedFriend} onSelect={setSelectedFriend} />
        <ActivityDetail selectedDate={selectedDate} activities={activitiesForSelectedDate} onToggleActivity={handleToggleActivity} />
      </div>
    </div>
  );
}

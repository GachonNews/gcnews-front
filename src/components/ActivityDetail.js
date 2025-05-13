// src/components/ActivityDetail.js
import React from 'react';

const activityDetailStyle = {
  padding: '20px',
  borderLeft: '1px solid #eee',
  flexGrow: 1,
  backgroundColor: '#fdfaf5', // 스크린샷 오른쪽 배경색과 유사하게
};

const activityItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const checkboxStyle = {
  marginRight: '10px',
};

const ActivityDetail = ({ date, activities, onToggleActivity }) => {
  if (!date || !activities) {
    return (
      <div style={activityDetailStyle}>
        <p>날짜를 선택해주세요 또는 해당 날짜의 활동 기록이 없습니다.</p>
      </div>
    );
  }

  // 날짜 포맷 변경 (YYYY-MM-DD -> YYYY.MM.DD의 활동 기록)
  const formattedDate = date.replace(/-/g, '.');

  return (
    <div style={activityDetailStyle}>
      <h3>{formattedDate}의 활동 기록</h3>
      {activities.length === 0 ? (
        <p>활동 기록이 없습니다.</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} style={activityItemStyle}>
              <input
                type="checkbox"
                style={checkboxStyle}
                checked={activity.completed}
                onChange={() => onToggleActivity(activity.id)}
              />
              <span>{activity.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityDetail;
// 📁 src/components/ActivityDetail.jsx
import React from 'react';

const ActivityDetail = ({ date, activities }) => {
  return (
    <div style={{ marginTop: '2rem', textAlign: 'left' }}>
      <h3>{date} 활동 내역</h3>
      <ul>
        {activities.map((act, i) => <li key={i}>{act}</li>)}
      </ul>
    </div>
  );
};

export default ActivityDetail;
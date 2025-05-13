// src/components/ActivityDetail.jsx
import React from "react";

const ActivityDetail = ({ selectedDate, activities, onToggleActivity }) => {
  return (
    <div className="activity-detail">
      <h3>{selectedDate}의 활동 기록</h3>
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <input
            type="checkbox"
            checked={activity.completed}
            onChange={() => onToggleActivity(activity.id)}
          />
          <label>{activity.text}</label>
        </div>
      ))}
    </div>
  );
};

export default ActivityDetail;

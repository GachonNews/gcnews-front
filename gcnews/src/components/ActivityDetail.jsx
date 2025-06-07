// 📁 src/components/ActivityDetail.jsx
import React from "react";

const ActivityDetail = ({ date, activities }) => {
  return (
    <div style={{ marginTop: "2px", textAlign: "left", marginBottom: "10px" }}>
      <h3>{date} 활동 내역</h3>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "20px",
          marginTop: "10px",
          marginLeft: "5px",
        }}
      >
        {activities.map((act, i) => (
          <li key={i} style={{ marginBottom: "5px" }}>
            {act}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityDetail;

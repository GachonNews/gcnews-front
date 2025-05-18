// 📁 src/components/EmotionIcon.jsx
import React from 'react';

const EmotionIcon = ({ count }) => {
  const icons = [
    { emoji: '😟', color: 'gray' },
    { emoji: '🙂', color: 'black' },
    { emoji: '😊', color: 'gold' },
    { emoji: '😁', color: 'green' },
  ];

  return (
    <span style={{ fontSize: '2rem', color: icons[count]?.color || 'gray' }}>
      {icons[count]?.emoji || '😟'}
    </span>
  );
};

export default EmotionIcon;





// 📁 src/components/FriendList.jsx
import React from 'react';

const FriendList = ({ friends, onSelect }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {friends.map(friend => (
        <button
          key={friend}
          onClick={() => onSelect(friend)}
          style={{ margin: '0 5px', padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          {friend}
        </button>
      ))}
    </div>
  );
};
export default FriendList;
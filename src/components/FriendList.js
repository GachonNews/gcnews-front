// src/components/FriendList.js
import React from 'react';

const friendListStyle = {
  padding: '20px',
  backgroundColor: '#fdfaf5', // 스크린샷 오른쪽 배경색과 유사하게
};

const friendItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  cursor: 'pointer',
  borderRadius: '4px',
};

const selectedFriendItemStyle = {
  ...friendItemStyle,
  backgroundColor: '#e0e0e0', // 선택된 친구 배경색
};

const friendIconStyle = {
  marginRight: '10px',
  fontSize: '20px', // 아이콘 크기
};

const FriendList = ({ friends, selectedFriend, onSelect }) => {
  return (
    <div style={friendListStyle}>
      <p style={{fontWeight: 'bold', marginBottom: '10px'}}>친구 목록</p>
      {friends.map(friend => (
        <div
          key={friend}
          style={friend === selectedFriend ? selectedFriendItemStyle : friendItemStyle}
          onClick={() => onSelect(friend)}
        >
          <span style={friendIconStyle}>👤</span> {/* 아이콘 대체 */}
          <span>{friend === 'me' ? '나' : friend}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
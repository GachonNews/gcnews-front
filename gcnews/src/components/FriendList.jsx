// src/components/FriendList.jsx
import React from 'react';
import PersonIcon from './PersonIcon'; // PersonIcon.jsx가 있다고 가정

const FriendList = ({ friends, selectedFriendId, onSelect }) => {
  // friends는 [{ id, name }, ...] 형태의 객체 배열
  // selectedFriendId는 현재 선택된 친구의 ID
  // onSelect는 클릭된 친구의 ID를 인자로 받는 함수

  return (
    <div className="friend-list-container">
      {friends && friends.length > 0 ? (
        friends.map(friend => (
          <button
            key={friend.id} // 고유한 ID를 key로 사용
            onClick={() => onSelect(friend.id)} // 클릭 시 ID 전달
            className={`friend-button ${selectedFriendId === friend.id ? 'selected' : ''}`}
            title={friend.name}
          >
            <PersonIcon className="friend-icon" />
            <span className="friend-name">{friend.name || '이름없음'}</span>
          </button>
        ))
      ) : (
        <p>친구 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default FriendList;
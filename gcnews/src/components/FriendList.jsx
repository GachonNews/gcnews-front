// src/components/FriendList.jsx
import React from "react";

const FriendList = ({ selectedFriend, onSelect }) => {
  const friends = ["me", "이름1", "이름2", "이름3", "이름4"];

  return (
    <div className="friend-list">
      <h4>친구 목록</h4>
      {friends.map((friend) => (
        <button
          key={friend}
          className={`friend-button ${selectedFriend === friend ? "selected" : ""}`}
          onClick={() => onSelect(friend)}
        >
          {friend}
        </button>
      ))}
    </div>
  );
};

export default FriendList;

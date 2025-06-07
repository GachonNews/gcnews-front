import React, { useState, useEffect } from "react";
import PersonIcon from "./PersonIcon";
import {
  fetchFriendDetailsList,
  addFriend,
  deleteFriend,
} from "../apis/friends";
import "./FriendList.css";
import { axiosInstance } from "../apis/axios";

// 에러 팝업 컴포넌트
const ErrorPopup = ({ message, onClose }) => (
  <div className="error-popup">
    <div className="popup-content">
      <p>{message}</p>
      <button onClick={onClose} className="popup-close">
        ✕
      </button>
    </div>
    <div className="popup-backdrop" onClick={onClose} />
  </div>
);

const FriendList = ({ selectedFriendId, onSelect }) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // 친구 프로필 정보 가져오기
  const fetchFriendProfile = async (friendId) => {
    try {
      const res = await axiosInstance.get(`/api/user-info/friend/${friendId}`);
      return res.data.data;
    } catch (error) {
      console.error(`친구 ${friendId} 상세 조회 실패:`, error);
      return null;
    }
  };

  // 친구 목록 + 상세 정보 병렬 조회
  const loadFriends = async () => {
    setLoading(true);
    try {
      const data = await fetchFriendDetailsList();
      const friendsWithDetails = await Promise.all(
        data.map(async (f) => {
          const details = await fetchFriendProfile(f.friendId);
          return {
            id: String(f.friendId),
            name: details?.name || `친구 ${f.friendId}`,
            loginId: details?.loginId || "알 수 없음",
          };
        })
      );
      setFriends(friendsWithDetails);
      setError("");
    } catch (error) {
      setError("친구 목록을 불러올 수 없습니다.");
    }
    setLoading(false);
  };

  // 최초 렌더 시 친구 목록 로드
  useEffect(() => {
    loadFriends();
  }, []);

  // 친구 추가 핸들러
  const handleAddFriend = async (e) => {
    e.preventDefault();
    const inputId = newFriend.trim();
    if (!inputId) return;

    setLoading(true);
    try {
      const success = await addFriend(inputId);
      if (!success) throw new Error("추가 실패");
      await loadFriends();
      setNewFriend("");
      setShowAddForm(false);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "친구 추가에 실패했습니다");
      setTimeout(() => setError(""), 5000);
    }
    setLoading(false);
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = async (friendId, e) => {
    e.stopPropagation();
    if (!window.confirm("정말 이 친구를 삭제하시겠습니까?")) return;

    setLoading(true);
    try {
      const success = await deleteFriend(friendId);
      if (!success) throw new Error("삭제 실패");
      await loadFriends();
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "친구 삭제 실패");
      setTimeout(() => setError(""), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="circle-friend-list">
      {/* 에러 팝업 */}
      {error && <ErrorPopup message={error} onClose={() => setError("")} />}

      {/* 헤더 */}
      <div className="friend-list-header">
        <h3 className="friend-list-title">친구 목록</h3>
        <button
          className="add-friend-toggle"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={loading}
        >
          {showAddForm ? "✕" : "+"}
        </button>
      </div>

      {/* 친구 추가 폼 */}
      {showAddForm && (
        <form className="friend-add-form" onSubmit={handleAddFriend}>
          <div className="add-form-group">
            <input
              type="text"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              placeholder="친구 ID 입력"
              disabled={loading}
              className="add-friend-input"
            />
            <button
              type="submit"
              disabled={loading || !newFriend.trim()}
              className="add-friend-btn"
            >
              추가
            </button>
          </div>
        </form>
      )}

      {/* 원형 친구 목록 */}
      <div className="circle-friends-container">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className={`circle-friend-item ${
                selectedFriendId === friend.id ? "selected" : ""
              }`}
              onClick={() => onSelect && onSelect(friend.id)}
            >
              <div className="circle-avatar">
                <PersonIcon
                  variant="circle"
                  size={40}
                  isActive={selectedFriendId === friend.id}
                />
                <button
                  className="delete-overlay"
                  onClick={(e) => handleDeleteFriend(friend.id, e)}
                  disabled={loading}
                  title="삭제"
                >
                  ×
                </button>
              </div>
              <span className="circle-friend-name">{friend.name}</span>
            </div>
          ))
        ) : (
          <div className="empty-friends">
            <div className="empty-circle">
              <PersonIcon variant="circle" size={36} />
            </div>
            <span className="empty-text">친구 없음</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendList;

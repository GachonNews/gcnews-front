import React, { useState, useEffect } from 'react';
import PersonIcon from './PersonIcon';
import { 
  fetchFriendDetailsList, 
  addFriend, 
  deleteFriend 
} from '../apis/friends';
import './FriendList.css';
import { axiosInstance } from '../apis/axios';

// 에러 팝업 컴포넌트
const ErrorPopup = ({ message, onClose }) => (
  <div className="error-popup">
    <div className="popup-content">
      <p>{message}</p>
      <button onClick={onClose} className="popup-close">✕</button>
    </div>
    <div className="popup-backdrop" onClick={onClose} />
  </div>
);

const FriendList = ({ selectedFriendId, onSelect }) => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 친구 프로필 정보 가져오기
  const fetchFriendProfile = async (friendId) => {
    try {
      const res = await axiosInstance.get(`/api/user-info/friend/${friendId}`);
      return res.data.data; // { name, loginId, ... }
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
            loginId: details?.loginId || '알 수 없음'
          };
        })
      );
      setFriends(friendsWithDetails);
      setError('');
    } catch (error) {
      setError('친구 목록을 불러올 수 없습니다.');
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
      if (!success) throw new Error('추가 실패');
      await loadFriends();
      setNewFriend('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || '친구 추가에 실패했습니다');
      // 5초 후 자동 닫힘
      setTimeout(() => setError(''), 5000);
    }
    setLoading(false);
  };

  // 친구 삭제 핸들러
  const handleDeleteFriend = async (friendId) => {
    setLoading(true);
    try {
      const success = await deleteFriend(friendId);
      if (!success) throw new Error('삭제 실패');
      await loadFriends();
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || '친구 삭제 실패');
      setTimeout(() => setError(''), 5000);
    }
    setLoading(false);
  };

  return (
    <div className="friend-list-container">
      {/* 에러 팝업 */}
      {error && <ErrorPopup message={error} onClose={() => setError('')} />}
      
      {/* 친구 추가 입력 폼 */}
      <form className="friend-add-form" onSubmit={handleAddFriend}>
        <input
          type="text"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          placeholder="친구 ID 입력"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "추가 중..." : "추가"}
        </button>
      </form>

      {/* 친구 목록 */}
      {friends.length > 0 ? (
        friends.map(friend => (
          <div className="friend-item" key={friend.id}>
            <button
              onClick={() => onSelect && onSelect(friend.id)}
              className={`friend-button ${selectedFriendId === friend.id ? 'selected' : ''}`}
              disabled={loading}
            >
              <PersonIcon className="friend-icon" />
              <span className="friend-name">{friend.name}</span>
            </button>
            <button
              className="friend-delete-btn"
              onClick={() => handleDeleteFriend(friend.id)}
              disabled={loading}
              title="삭제"
            >
              ×
            </button>
          </div>
        ))
      ) : (
        <p className="friend-empty">친구 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default FriendList;

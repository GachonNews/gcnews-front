// /src/layouts/CalendarLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FriendList from '../components/FriendList';
import ActivityDetail from '../components/ActivityDetail';
// import GcNewsHeader from '../components/GcNewsHeader'; // GcNewsHeader를 사용하지 않는 경우
import './CalendarLayout.css'; // CalendarLayout.css 임포트

import {
  fetchFriendIdList,
  fetchFriendNameById,
  fetchMyProfile,
  fetchMonthlyActivities,
} from '../apis/friends';

// 홈 아이콘 SVG (간단한 예시)
const HomeIcon = ({ size = 28, color = '#333' }) => ( // 아이콘 색상 기본값 설정
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    strokeWidth="2" // 선 굵기 조절
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);


const CalendarLayout = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [myProfile, setMyProfile] = useState(null);
  const [friendList, setFriendList] = useState([]); // [{ id, name }, ...] 객체 배열로 관리
  const [selectedFriend, setSelectedFriend] = useState(null); // 현재 선택된 친구의 "ID"
  const [activityData, setActivityData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  // friendMap은 현재 코드에서 명시적으로 사용되지 않으므로, 필요 없다면 제거 가능
  // const [friendMap, setFriendMap] = useState({}); 


  // 1. "나"의 정보 및 친구 목록 로딩
  useEffect(() => {
    const loadFriends = async () => {
      try {
        console.log('CalendarLayout: loadFriends - 내 정보 및 친구 목록 로딩 시작');
        const meData = await fetchMyProfile(); // { name, id (고유 식별자) } 반환 가정
        
        if (meData && meData.name && meData.id && !meData.error) {
          setMyProfile(meData);
          console.log('CalendarLayout: loadFriends - 내 정보 (meData 객체):', JSON.stringify(meData, null, 2));

          const idListFromApi = await fetchFriendIdList(); // 예: [{ userId, friendId }, ...]
          console.log('CalendarLayout: loadFriends - fetchFriendIdList 결과:', JSON.stringify(idListFromApi, null, 2));
          
          let processedFriendListObjects = [{ id: meData.id, name: meData.name }];

          if (idListFromApi && idListFromApi.length > 0) {
              const friendPromises = idListFromApi.map(async (friendEntry) => {
                if (friendEntry && typeof friendEntry.friendId !== 'undefined') {
                  try {
                    const name = await fetchFriendNameById(friendEntry.friendId);
                    if (name) {
                      return { id: friendEntry.friendId, name: name };
                    }
                    console.warn(`친구 ID ${friendEntry.friendId}의 이름을 가져오지 못했습니다.`);
                    return null;
                  } catch (err) { 
                    console.error(`친구 이름 조회 실패 (friendId: ${friendEntry.friendId}):`, err); 
                    return null; 
                  }
                }
                return null;
              });
              const resolvedFriendObjects = (await Promise.all(friendPromises)).filter(obj => obj !== null);
              // ID 기준으로 중복 제거
              const uniqueFriendObjects = Array.from(new Map(resolvedFriendObjects.map(f => [f.id, f])).values());
              processedFriendListObjects = [{ id: meData.id, name: meData.name }, ...uniqueFriendObjects];
          }
          
          setFriendList(processedFriendListObjects);
          setSelectedFriend(meData.id); // "나"의 ID로 기본 선택
          console.log('CalendarLayout: loadFriends - 최종 friendList (객체배열):', JSON.stringify(processedFriendListObjects, null, 2));

        } else {
          console.error('CalendarLayout: loadFriends - 내 프로필 정보 로딩 실패 또는 오류. meData:', JSON.stringify(meData, null, 2));
          setMyProfile({ name: "정보없음", id: null });
          setFriendList([{ id: null, name: "정보없음" }]);
          setSelectedFriend(null);
        }
      } catch (err) {
        console.error('CalendarLayout: loadFriends - 전체 오류:', err);
        setMyProfile({ name: "정보없음", id: null });
        setFriendList([{ id: null, name: "정보없음" }]);
        setSelectedFriend(null);
      }
    };
    loadFriends();
  }, []); // 마운트 시 한 번만 실행

  // 2. 선택된 친구 또는 날짜(년/월)가 변경되면 활동 데이터 로딩
  useEffect(() => {
    const loadActivitiesForCalendar = async () => {
      if (myProfile && selectedFriend && year && month) { // selectedFriend는 ID
        let currentUserId = selectedFriend;
        let isFetchingForMe = (selectedFriend === myProfile.id);
        
        console.log(`CalendarLayout: loadActivities - 사용자 ID '${currentUserId}' (${isFetchingForMe ? '나' : '친구'})의 ${year}년 ${month}월 활동 데이터 로딩 시도`);
        const monthlyApiActivityArray = await fetchMonthlyActivities(currentUserId, year, month, isFetchingForMe);
        console.log('CalendarLayout: Fetched Monthly API Data (Array):', JSON.stringify(monthlyApiActivityArray, null, 2));

        const processedData = {};
        if (monthlyApiActivityArray && Array.isArray(monthlyApiActivityArray)) {
          monthlyApiActivityArray.forEach(activityLog => {
            const dateKey = activityLog.visitDate;
            if (!dateKey || typeof dateKey !== 'string') {
              console.warn("CalendarLayout: 활동 로그에 유효한 visitDate가 없습니다:", activityLog);
              return;
            }

            const completedTasks = [];
            // 🚨 API 실제 응답 필드명과 정확히 일치하도록 수정해야 합니다!
            // 예시: newsId, quizzed, summarized 사용 (API 응답 확인 후 최종 결정)
            if (activityLog.newsId != null && activityLog.newsId !== 0) {
                completedTasks.push('뉴스 보기');
            }
            if (activityLog.quized === true) { 
                completedTasks.push('퀴즈 풀기');
            }
            if (activityLog.summarized === true) {
                completedTasks.push('요약본 읽기');
            }

            processedData[dateKey] = {
              activitiesCount: completedTasks.length,
              detail: completedTasks,
            };
          });
        }
        setActivityData(processedData);
        console.log(`CalendarLayout: 사용자 ID '${currentUserId}' 활동 데이터 가공 완료:`, JSON.stringify(processedData, null, 2));
      } else {
        setActivityData({});
      }
      setSelectedDate(null);
    };

    if (myProfile) { // myProfile이 설정된 이후에만 활동 로딩
        loadActivitiesForCalendar();
    }
  }, [selectedFriend, year, month, myProfile]); // 의존성 배열

  const handleGoToNews = () => {
    navigate('/news');
  };

  return (
    <div className="calendar-layout">
      <header className="calendar-header-custom">
        <button
          onClick={handleGoToNews}
          className="home-icon-btn" // CSS 클래스
          aria-label="뉴스 페이지로 이동"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon />
        </button>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2.5em' }}>GC NEWS</h1>
        </div>
        <div style={{ width: '40px' }}></div> {/* 오른쪽 공간 균형 맞춤용 */}
      </header>

      <main className="calendar-main-content">
        <div className="calendar-left-section">
          <Outlet context={{
            year,
            month,
            data: activityData,
            selectedDate,
            onDateClick: setSelectedDate,
            setYear,
            setMonth,
            today: {
              year: today.getFullYear(),
              month: today.getMonth() + 1,
              date: today.getDate()
            }
          }} />
        </div>
        <div className="calendar-right-section">
          <FriendList
            friends={friendList} // [{id, name}, ...] 객체 배열 전달
            selectedFriendId={selectedFriend} // 현재 선택된 친구의 ID
            onSelect={(friendId) => setSelectedFriend(friendId)} // 친구 클릭 시 ID로 selectedFriend 업데이트
          />
          {/* 노란색 디버그 섹션은 유지하거나 필요시 제거 */}
          {/* <div style={{ background: 'yellow', padding: '10px', marginTop: '1rem' }}>
            <p style={{ color: 'black' }}>✅ 이 영역은 calendar-right-section입니다.</p>
          </div> */}
           {selectedDate &&
           activityData[selectedDate] &&
           activityData[selectedDate].detail && (
            <ActivityDetail
              date={selectedDate}
              activities={activityData[selectedDate].detail}
            />
          )}
        </div>
      </main>
      <footer className="calendar-footer">
        <p>버전 정보 V 1.0.1</p>
      </footer>
    </div>
  );
};

export default CalendarLayout;
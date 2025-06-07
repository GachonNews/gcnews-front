// CalendarPage.jsx
import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import FriendList from "../components/FriendList";
import ActivityDetail from "../components/ActivityDetail";
import "./CalendarPage.css";

import {
  fetchFriendIdList,
  fetchFriendNameById,
  fetchMyProfile,
  fetchMonthlyActivities,
} from "../apis/friends";

export default function CalendarPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const [myProfile, setMyProfile] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activityData, setActivityData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // 1. "나"의 정보 및 친구 목록 로딩
  useEffect(() => {
    const loadFriends = async () => {
      try {
        console.log(
          "CalendarPage: loadFriends - 내 정보 및 친구 목록 로딩 시작"
        );
        const meData = await fetchMyProfile();

        if (meData && meData.name && meData.id && !meData.error) {
          setMyProfile(meData);
          console.log(
            "CalendarPage: loadFriends - 내 정보 (meData 객체):",
            JSON.stringify(meData, null, 2)
          );

          const idListFromApi = await fetchFriendIdList();
          console.log(
            "CalendarPage: loadFriends - fetchFriendIdList 결과:",
            JSON.stringify(idListFromApi, null, 2)
          );

          let processedFriendListObjects = [
            { id: meData.id, name: meData.name },
          ];

          if (idListFromApi && idListFromApi.length > 0) {
            const friendPromises = idListFromApi.map(async (friendEntry) => {
              if (friendEntry && typeof friendEntry.friendId !== "undefined") {
                try {
                  const name = await fetchFriendNameById(friendEntry.friendId);
                  if (name) {
                    return { id: friendEntry.friendId, name: name };
                  }
                  console.warn(
                    `친구 ID ${friendEntry.friendId}의 이름을 가져오지 못했습니다.`
                  );
                  return null;
                } catch (err) {
                  console.error(
                    `친구 이름 조회 실패 (friendId: ${friendEntry.friendId}):`,
                    err
                  );
                  return null;
                }
              }
              return null;
            });
            const resolvedFriendObjects = (
              await Promise.all(friendPromises)
            ).filter((obj) => obj !== null);
            const uniqueFriendObjects = Array.from(
              new Map(resolvedFriendObjects.map((f) => [f.id, f])).values()
            );
            processedFriendListObjects = [
              { id: meData.id, name: meData.name },
              ...uniqueFriendObjects,
            ];
          }

          setFriendList(processedFriendListObjects);
          setSelectedFriend(meData.id);
          console.log(
            "CalendarPage: loadFriends - 최종 friendList (객체배열):",
            JSON.stringify(processedFriendListObjects, null, 2)
          );
        } else {
          console.error(
            "CalendarPage: loadFriends - 내 프로필 정보 로딩 실패 또는 오류. meData:",
            JSON.stringify(meData, null, 2)
          );
          setMyProfile({ name: "정보없음", id: null });
          setFriendList([{ id: null, name: "정보없음" }]);
          setSelectedFriend(null);
        }
      } catch (err) {
        console.error("CalendarPage: loadFriends - 전체 오류:", err);
        setMyProfile({ name: "정보없음", id: null });
        setFriendList([{ id: null, name: "정보없음" }]);
        setSelectedFriend(null);
      }
    };
    loadFriends();
  }, []);

  // 2. 선택된 친구 또는 날짜(년/월)가 변경되면 활동 데이터 로딩
  useEffect(() => {
    const loadActivitiesForCalendar = async () => {
      if (myProfile && selectedFriend && year && month) {
        let currentUserId = selectedFriend;
        let isFetchingForMe = selectedFriend === myProfile.id;

        console.log(
          `CalendarPage: loadActivities - 사용자 ID '${currentUserId}' (${
            isFetchingForMe ? "나" : "친구"
          })의 ${year}년 ${month}월 활동 데이터 로딩 시도`
        );
        const monthlyApiActivityArray = await fetchMonthlyActivities(
          currentUserId,
          year,
          month,
          isFetchingForMe
        );
        console.log(
          "CalendarPage: Fetched Monthly API Data (Array):",
          JSON.stringify(monthlyApiActivityArray, null, 2)
        );

        const processedData = {};
        if (monthlyApiActivityArray && Array.isArray(monthlyApiActivityArray)) {
          monthlyApiActivityArray.forEach((activityLog) => {
            const dateKey = activityLog.visitDate;
            if (!dateKey || typeof dateKey !== "string") {
              console.warn(
                "CalendarPage: 활동 로그에 유효한 visitDate가 없습니다:",
                activityLog
              );
              return;
            }

            const completedTasks = [];
            if (activityLog.newsId != null && activityLog.newsId !== 0) {
              completedTasks.push("뉴스 보기");
            }
            if (activityLog.quized === true) {
              completedTasks.push("퀴즈 풀기");
            }
            if (activityLog.summarized === true) {
              completedTasks.push("요약본 읽기");
            }

            processedData[dateKey] = {
              activitiesCount: completedTasks.length,
              detail: completedTasks,
            };
          });
        }
        setActivityData(processedData);
        console.log(
          `CalendarPage: 사용자 ID '${currentUserId}' 활동 데이터 가공 완료:`,
          JSON.stringify(processedData, null, 2)
        );
      } else {
        setActivityData({});
      }
      setSelectedDate(null);
    };

    if (myProfile) {
      loadActivitiesForCalendar();
    }
  }, [selectedFriend, year, month, myProfile]);

  return (
    <div className="calendar-page-container">
      <div className="calendar-left-section">
        <Calendar
          year={year}
          month={month}
          data={activityData}
          onDateClick={setSelectedDate}
          selectedDate={selectedDate}
          setYear={setYear}
          setMonth={setMonth}
          today={{
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
          }}
        />
      </div>
      <div className="calendar-right-section">
        <FriendList
          friends={friendList}
          selectedFriendId={selectedFriend}
          onSelect={(friendId) => setSelectedFriend(friendId)}
        />
        {selectedDate &&
          activityData[selectedDate] &&
          activityData[selectedDate].detail && (
            <ActivityDetail
              date={selectedDate}
              activities={activityData[selectedDate].detail}
            />
          )}
      </div>
    </div>
  );
}

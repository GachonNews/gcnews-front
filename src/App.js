// src/App.js
import './App.css';
import Calendar from './components/Calendar';
import FriendList from './components/FriendList';
import Header from './components/Header';
import ActivityDetail from './components/ActivityDetail';
import { useState, useEffect } from 'react';

// 모든 날짜에 적용될 기본 활동 목록
const DEFAULT_ACTIVITIES = [
  { id: 'news_reading', text: '뉴스 읽기', completed: false },
  { id: 'summary_reading', text: '요약 읽기', completed: false },
  { id: 'quiz_solving', text: '퀴즈 풀기', completed: false },
];

// 완료된 활동 수에 따라 감정 레벨을 결정하는 함수
const calculateEmotionLevel = (activities) => {
  if (!activities) return 0;
  const completedCount = activities.filter(act => act.completed).length;
  if (completedCount === 3) return 3; // 모두 완료
  if (completedCount === 2) return 2; // 2개 완료
  if (completedCount === 1) return 1; // 1개 완료
  return 0; // 0개 완료
};

function App() {
  // 초기 mockData는 비워두거나, 특정 날짜에 대한 상태를 미리 설정할 수 있습니다.
  // 이제 completed, detail 대신 activities 배열과 emotionLevel을 사용합니다.
  const [mockData, setMockData] = useState({
    me: {
      // 예시: '2025-04-25'에 미리 설정된 활동 상태
      '2025-04-25': {
        activities: [
          { id: 'news_reading', text: '뉴스 읽기', completed: true },
          { id: 'summary_reading', text: '요약 읽기', completed: false },
          { id: 'quiz_solving', text: '퀴즈 풀기', completed: true },
        ],
        emotionLevel: 2, // 위 활동 상태에 따라 계산된 값 (2개 완료)
      },
      '2025-05-09': { // 이전 데이터 예시 (기본 활동으로 변환되어야 함)
         activities: [ // '복습'과 같은 커스텀 활동은 현재 로직에서 기본으로 포함되지 않음
           { id: 'news_reading', text: '뉴스 읽기', completed: true },
           { id: 'summary_reading', text: '요약 읽기', completed: true }, // '요약 읽기'로 가정
           { id: 'quiz_solving', text: '퀴즈 풀기', completed: true },   // '퀴즈'로 가정
        ],
        emotionLevel: 3,
      }
    },
    이름1: {
        '2025-04-25': {
            activities: [
              { id: 'news_reading', text: '뉴스 읽기', completed: false },
              { id: 'summary_reading', text: '요약 읽기', completed: false },
              { id: 'quiz_solving', text: '퀴즈 풀기', completed: false },
            ],
            emotionLevel: 0,
          }
    },
    이름2: {},
    이름3: {},
    이름4: {},
  });

  const [selectedFriend, setSelectedFriend] = useState('me');
  const [selectedDate, setSelectedDate] = useState(null); // YYYY-MM-DD 형식
  const [currentMonth, setCurrentMonth] = useState({ year: 2025, month: 4 }); // 스크린샷 기준

  const handleDateClick = (dateStr) => { // dateStr은 'YYYY-MM-DD'
    setSelectedDate(dateStr);
  };

  const handleToggleActivity = (activityId) => {
    setMockData(prevMockData => {
      // 깊은 복사를 통해 불변성 유지 시도 (실제 복잡한 앱에서는 immer 같은 라이브러리 사용 권장)
      const newData = JSON.parse(JSON.stringify(prevMockData));

      if (!selectedFriend || !selectedDate) return newData;

      // 친구 데이터 초기화
      if (!newData[selectedFriend]) {
        newData[selectedFriend] = {};
      }
      // 날짜 데이터 초기화 (기본 활동 목록으로)
      if (!newData[selectedFriend][selectedDate] || !newData[selectedFriend][selectedDate].activities) {
        newData[selectedFriend][selectedDate] = {
          activities: DEFAULT_ACTIVITIES.map(act => ({ ...act })), // 기본 활동 복사
          emotionLevel: 0,
        };
      }

      // 현재 날짜의 활동 목록 가져오기
      let currentActivities = newData[selectedFriend][selectedDate].activities.map(act => ({...act}));

      // 모든 활동이 기본 활동 목록에 있도록 보장 (ID 기준)
      // 저장된 활동과 기본 활동을 병합. 저장된 상태 우선.
      let updatedActivities = DEFAULT_ACTIVITIES.map(defaultAct => {
        const existingAct = currentActivities.find(ca => ca.id === defaultAct.id);
        return existingAct ? { ...existingAct } : { ...defaultAct }; // 기존 상태 유지 또는 기본값 사용
      });


      // 토글할 활동 찾아서 상태 변경
      const activityToToggle = updatedActivities.find(act => act.id === activityId);
      if (activityToToggle) {
        activityToToggle.completed = !activityToToggle.completed;
      }

      newData[selectedFriend][selectedDate].activities = updatedActivities;
      newData[selectedFriend][selectedDate].emotionLevel = calculateEmotionLevel(updatedActivities);

      return newData;
    });
  };


  // 선택된 날짜의 활동 목록을 가져오는 로직
  const getActivitiesForSelectedDate = () => {
    if (!selectedFriend || !selectedDate) {
      // 날짜가 선택되지 않았으면 기본 활동 목록을 보여주되, 모두 미완료 상태
      return DEFAULT_ACTIVITIES.map(act => ({ ...act, completed: false }));
    }

    const friendData = mockData[selectedFriend];
    const dayData = friendData ? friendData[selectedDate] : null;

    if (dayData && dayData.activities) {
      // 저장된 활동 상태와 기본 활동을 병합하여 반환
      // (모든 기본 활동이 목록에 포함되도록 보장)
      return DEFAULT_ACTIVITIES.map(defaultActivity => {
        const storedActivity = dayData.activities.find(sa => sa.id === defaultActivity.id);
        return {
          ...defaultActivity, // 기본 텍스트, ID 사용
          completed: storedActivity ? storedActivity.completed : false, // 저장된 완료 상태 또는 기본값
        };
      });
    }

    // 해당 날짜에 저장된 데이터가 없으면 기본 활동 목록 (모두 미완료) 반환
    return DEFAULT_ACTIVITIES.map(act => ({ ...act, completed: false }));
  };

  const activitiesToDisplay = getActivitiesForSelectedDate();
  const calendarDataForFriend = mockData[selectedFriend] || {};

  // App.js가 처음 로드될 때 또는 mockData가 변경될 때 모든 날짜의 emotionLevel 업데이트 (선택적 최적화)
  // 여기서는 handleToggleActivity에서 개별적으로 업데이트하므로 필수 아님.
  // useEffect(() => {
  //   // 필요하다면 mockData의 모든 emotionLevel을 재계산하는 로직
  // }, [mockData]);


  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <div className="calendar-container">
          <Calendar
            year={currentMonth.year}
            month={currentMonth.month}
            data={calendarDataForFriend} // 친구의 전체 활동 데이터 (emotionLevel 포함)
            onDateClick={handleDateClick}
            selectedDate={selectedDate}
          />
        </div>
        <div className="sidebar">
          <FriendList
            friends={Object.keys(mockData)}
            selectedFriend={selectedFriend}
            onSelect={(friend) => {
              setSelectedFriend(friend);
              // setSelectedDate(null); // 친구 변경 시 날짜 선택 초기화 (선택 사항)
            }}
          />
          <ActivityDetail
            date={selectedDate}
            activities={activitiesToDisplay} // 항상 3개의 기본 활동을 포함
            onToggleActivity={handleToggleActivity}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
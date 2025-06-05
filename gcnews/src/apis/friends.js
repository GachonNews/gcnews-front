import { axiosInstance } from './axios';

export const fetchMyProfile = async () => {
  try {
    console.log('fetchMyProfile: 호출 시작 (실제 API)');
    const res = await axiosInstance.get('/api/user-info/profile');
    console.log('fetchMyProfile: /api/user-info/profile 응답 res 객체:', JSON.stringify(res, null, 2));
    if (res && res.data && res.data.data && typeof res.data.data.name !== 'undefined') {
      const { name, loginId, userId } = res.data.data; // API가 userId도 반환한다고 가정
      // 실제 반환되는 고유 ID 필드명으로 id 설정 (예: userId 또는 loginId)
      return { name, id: userId || loginId || name }; 
    } else {
      console.error('fetchMyProfile: API 응답 구조 문제 또는 name 없음. res.data:', JSON.stringify(res.data, null, 2));
      return { name: undefined, id: undefined, error: 'Invalid API response for my profile' };
    }
  } catch (error) {
    console.error('fetchMyProfile: API 호출 중 오류:', error.response ? error.response.data : error.message);
    return { name: undefined, id: undefined, error: error.message };
  }
};

export const fetchFriendIdList = async () => {
  try {
    console.log('fetchFriendIdList: 호출 시작');
    const res = await axiosInstance.get('/api/user-info/friend');
    console.log('fetchFriendIdList: /api/user-info/friend 응답 res.data.data:', JSON.stringify(res.data.data, null, 2));
    return res.data.data || []; // API가 data 필드에 배열을 반환한다고 가정
  } catch (error) {
    console.error('fetchFriendIdList: API 호출 중 오류:', error.response ? error.response.data : error.message);
    return [];
  }
};

// 친구 프로필(이름) 조회
export const fetchFriendNameById = async (friendId) => {
  //백엔드 API 명세에 따른 정확한 친구 프로필 조회 엔드포인트 사용
  //경로 변수 /api/user-info/profile/{friendId}
  //쿼리 파라미터 /api/user-info/profile?userId={friendId}
  const apiUrl = `/api/user-info/friend/${friendId}`; // 👈 이 URL을 실제 API 명세에 맞게 확정해야 합니다.

  try {
    console.log(`fetchFriendNameById: 친구 ID "${friendId}"로 이름 조회 시작, URL: ${apiUrl}`);
    const res = await axiosInstance.get(apiUrl); // 쿼리 파라미터 방식이면 두 번째 인자로 { params: { userId: friendId } } 전달
    console.log(`fetchFriendNameById: ID "${friendId}" 응답 res 객체:`, JSON.stringify(res, null, 2));

    // API 응답 구조 확인 (서버가 OurApiResponse로 감싸고, 그 안 data 필드에 실제 사용자 객체가 있다고 가정)
    if (res && res.data && res.data.data) {
      const friendProfile = res.data.data;
      if (typeof friendProfile.name === 'string' && friendProfile.name.trim() !== '') {
        return friendProfile.name;
      } else if (friendProfile.name === null && friendProfile.loginId) {
        // 이름이 null이지만 loginId가 있다면 loginId를 대신 사용
        return friendProfile.loginId;
      } else {
        console.warn(`fetchFriendNameById: ID "${friendId}"의 이름이 null이거나 유효하지 않습니다. 응답 데이터:`, JSON.stringify(friendProfile, null, 2));
        return `친구(${friendId})`; // 기본값
      }
    } else {
      console.warn(`fetchFriendNameById: ID "${friendId}"에 대한 응답 데이터 구조가 예상과 다릅니다. res.data:`, JSON.stringify(res.data, null, 2));
      return `친구(${friendId})`; // 데이터 구조 문제 시 기본값
    }
  } catch (error) {
    console.error(`fetchFriendNameById: ID "${friendId}" 이름 조회 중 오류 발생:`, error.response ? error.response.data : error.message);
    return `친구(${friendId})`; // 오류 발생 시 기본값
  }
};

// 월별 활동 데이터 가져오기
export const fetchMonthlyActivities = async (userId, year, month, isMe) => {
  let apiUrl = '';
  const params = { year, month };

  if (isMe) {
    apiUrl = `/api/user-info/attendance`; // 나의 활동
    // "나"의 활동 API가 userId 파라미터를 받는다면 아래 주석 해제
    // params.userId = userId; 
  } else {
    apiUrl = `/api/user-info/attendance/${userId}`; // 친구의 활동 (userId는 친구의 friendId)
  }

  try {
    console.log(`fetchMonthlyActivities: API 호출 시작 - URL: ${apiUrl}, Params:`, params, `isMe: ${isMe}`);
    const res = await axiosInstance.get(apiUrl, { params });
    console.log(`fetchMonthlyActivities: 응답 (${apiUrl}):`, JSON.stringify(res.data, null, 2));
    // API가 OurApiResponse로 감싸고 그 안의 data 필드에 활동 객체 배열을 반환한다고 가정
    return res.data.data || []; 
  } catch (error) {
    console.error(`fetchMonthlyActivities: API 호출 오류 (${apiUrl}):`, error.response ? error.response.data : error.message);
    return []; // 오류 시 빈 배열 반환
  }
};
import { axiosInstance } from "./axios";

// 사용자 활동 기록 API
export const recordUserActivity = async (activityData) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/user-info/recent",
      activityData
    );
    return data;
  } catch (error) {
    console.error("사용자 활동 기록 실패:", error);
    throw error;
  }
};

// AI 요약 활동 기록
export const recordSummaryActivity = async (newsId) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

  return recordUserActivity({
    newsId: newsId,
    visitDate: today,
    summarized: true,
    quized: false, // 기본값
  });
};

// 퀴즈 완료 활동 기록
export const recordQuizActivity = async (newsId) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

  return recordUserActivity({
    newsId: newsId,
    visitDate: today,
    summarized: false, // 기본값
    quized: true,
  });
};

// 뉴스 읽기 + AI 요약 동시 기록
export const recordNewsAndSummaryActivity = async (newsId) => {
  const today = new Date().toISOString().split("T")[0];

  return recordUserActivity({
    newsId: newsId,
    visitDate: today,
    summarized: true,
    quized: false,
  });
};

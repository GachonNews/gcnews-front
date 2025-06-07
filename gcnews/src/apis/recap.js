import { axiosInstance } from "./axios";

// 날짜를 YYYY-MM 형식으로 추출
const getCurrentYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const isValidYearMonth = (value) => /^\d{4}-\d{2}$/.test(value);

export const fetchRecapData = async (yearMonth = getCurrentYearMonth()) => {
  if (!isValidYearMonth(yearMonth)) {
    throw new Error("형식이 잘못된 날짜입니다 (예: 2025-05)");
  }

  try {
    const { data } = await axiosInstance.get(`/api/article/recap/${yearMonth}`);

    if (data.status === "success") {
      return data.data.map((article) => ({
        title: article.title,
        articleLink: article.aricleLink // 추가된 부분
      }));
    } else {
      throw new Error(data.message || "뉴스 리캡 응답 실패");
    }
  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        throw new Error("이번 달 뉴스 리캡이 없습니다.");
      }
      if (err.response.status === 400) {
        throw new Error("입력값 오류입니다.");
      }
    }
    throw new Error(err.message || "알 수 없는 오류 발생");
  }
};

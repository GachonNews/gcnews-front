// src/pages/NewsPage.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import NewsModal from "../components/NewsModal";
import OptimizedNewsItem from "../components/OptimizedNewsItem";
import OptimizedLikeButton from "../components/OptimizedLikeButton";
import MiniCalendar from "../components/MiniCalendar";
import { Brain } from "lucide-react";
import {
  getAllCategoryNews,
  getAllSubCategoryNews,
  getTop1News,
  getCategoryTop1News,
  getNewsSummary,
  postNewsView,
  getNewsQuiz,
} from "../apis/news";
import "./NewsPage.css";

const NewsPage = () => {
  const { category } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNewsData, setActiveNewsData] = useState(null);
  const [topNews, setTopNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리별 영어-한글 매핑
  const categoryMap = {
    economy: "경제",
    finance: "금융",
    industry: "산업",
    distribution: "유통",
    it: "IT",
    global: "국제",
  };

  // AI 요약 버튼 클릭 핸들러
  const handleAiSummary = useCallback(async (newsItem) => {
    console.log("AI 요약 요청:", newsItem.title);

    try {
      console.log(
        "조회수 증가, AI 요약, 퀴즈 API 호출 시작:",
        newsItem.crawlingId
      );

      const [viewResponse, summaryResponse, quizResponse] = await Promise.all([
        postNewsView(newsItem.crawlingId),
        getNewsSummary(newsItem.crawlingId),
        getNewsQuiz(newsItem.crawlingId),
      ]);

      console.log("조회수 증가 API 응답:", viewResponse);
      console.log("AI 요약 API 응답:", summaryResponse);
      console.log("퀴즈 API 응답:", quizResponse);

      const summaryContent = summaryResponse?.data?.summaryContent;
      const quizData = quizResponse?.data;

      if (summaryContent) {
        const newsWithSummary = {
          ...newsItem,
          content: summaryContent,
          title: `[AI 요약] ${newsItem.title}`,
          quizQuestion: quizData?.quizContent,
          quizAnswer: quizData?.quizAnswer,
        };

        setActiveNewsData(newsWithSummary);
        setIsModalOpen(true);
        console.log("AI 요약 성공:", summaryContent);
      } else {
        const newsWithError = {
          ...newsItem,
          content: "요약 정보를 가져올 수 없습니다.",
          title: `[AI 요약 실패] ${newsItem.title}`,
        };

        setActiveNewsData(newsWithError);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);

      try {
        console.log("AI 요약과 퀴즈만 재시도:", newsItem.crawlingId);
        const [summaryResponse, quizResponse] = await Promise.all([
          getNewsSummary(newsItem.crawlingId),
          getNewsQuiz(newsItem.crawlingId),
        ]);

        const summaryContent = summaryResponse?.data?.summaryContent;
        const quizData = quizResponse?.data;

        if (summaryContent) {
          const newsWithSummary = {
            ...newsItem,
            content: summaryContent,
            title: `[AI 요약] ${newsItem.title}`,
            quizQuestion: quizData?.quizContent,
            quizAnswer: quizData?.quizAnswer,
          };

          setActiveNewsData(newsWithSummary);
          setIsModalOpen(true);
          console.log("AI 요약 재시도 성공:", summaryContent);
          return;
        }
      } catch (retryError) {
        console.error("AI 요약 재시도도 실패:", retryError);
      }

      const errorMessage =
        error.response?.status === 404
          ? "해당 뉴스의 요약이 아직 준비되지 않았습니다."
          : "AI 요약을 가져오는 중 오류가 발생했습니다.";

      const newsWithError = {
        ...newsItem,
        content: errorMessage,
        title: `[AI 요약 실패] ${newsItem.title}`,
      };

      setActiveNewsData(newsWithError);
      setIsModalOpen(true);
    }
  }, []);

  // 뉴스 제목 클릭 핸들러
  const handleNewsClick = useCallback((newsItem) => {
    if (newsItem.articleLink) {
      console.log("뉴스 본문 링크로 이동:", newsItem.articleLink);
      window.open(newsItem.articleLink, "_blank");
    } else {
      console.warn("뉴스 본문 링크가 없습니다:", newsItem.title);
      setActiveNewsData(newsItem);
      setIsModalOpen(true);
    }
  }, []);

  // 텍스트 자르기 함수
  const truncateText = useCallback((text, maxLength = 30) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }, []);

  // 톱 뉴스 좋아요 핸들러
  const handleTopNewsLike = useCallback((newsItem, isLiked) => {
    console.log(`톱 뉴스 좋아요 ${isLiked ? "추가" : "취소"}:`, newsItem.title);
  }, []);

  // 뉴스 데이터 가져오기
  const fetchNewsData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 더미 데이터
      const dummyTopNews = {
        crawlingId: 1,
        title: category
          ? `${categoryMap[category]} 분야 주요 뉴스입니다`
          : "오늘의 주요 뉴스입니다",
        content: "뉴스 요약 내용이 들어갈 예정입니다...",
        category: category || "최신",
        uploadAt: new Date().toISOString(),
        imgLink:
          "https://via.placeholder.com/600x400/c7b5b5/ffffff?text=News+Image",
        articleLink: "https://example.com/news/1",
        views: 1000,
      };

      const dummyNewsList = Array.from({ length: 20 }, (_, i) => ({
        crawlingId: i + 2,
        title: `${category ? categoryMap[category] : "최신"} 뉴스 제목 ${
          i + 1
        } - 이것은 샘플 뉴스 제목입니다`,
        content: `뉴스 내용 ${i + 1}`,
        category: category || "최신",
        uploadAt: new Date().toISOString(),
        articleLink: `https://example.com/news/${i + 2}`,
        imgLink: null,
        views: Math.floor(Math.random() * 10000),
      }));

      try {
        if (!category) {
          const [topNewsResponse, allNewsResponse] = await Promise.all([
            getTop1News(),
            getAllCategoryNews(),
          ]);

          setTopNews(topNewsResponse?.data || dummyTopNews);
          setNewsList(allNewsResponse?.data || dummyNewsList);
        } else {
          const [topNewsResponse, categoryNewsResponse] = await Promise.all([
            getCategoryTop1News(category),
            getAllSubCategoryNews(category),
          ]);

          setTopNews(topNewsResponse?.data || dummyTopNews);
          setNewsList(categoryNewsResponse?.data || dummyNewsList);
        }
      } catch (apiError) {
        console.warn("API 호출 실패, 더미 데이터 사용:", apiError);
        setTopNews(dummyTopNews);
        setNewsList(dummyNewsList);
      }
    } catch (err) {
      console.error("뉴스 데이터 가져오기 실패:", err);
      setError("뉴스를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveNewsData(null);
  };

  // 오른쪽 섹션에 표시할 뉴스 (15개)
  const rightSectionNews = useMemo(() => newsList.slice(0, 15), [newsList]);

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchNewsData();
  }, [category]);

  // 로딩 상태
  if (loading) {
    return (
      <div className="news-home">
        <div className="left-container">
          <div className="main-article-box loading-box">
            <p>뉴스를 불러오는 중...</p>
          </div>
        </div>
        <div className="right-container">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="right-box loading-box">
              <div className="sub-box"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="news-home">
        <div className="left-container">
          <div className="main-article-box error-box">
            <p>{error}</p>
          </div>
        </div>
        <div className="right-container">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="right-box">
              <div className="sub-box"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="news-home">
      {/* 왼쪽 큰 박스 - 톱 뉴스 */}
      <div className="left-container">
        <div
          className="main-article-box"
          style={{
            backgroundImage: topNews?.imgLink
              ? `url(${topNews.imgLink})`
              : "none",
            backgroundColor: topNews?.imgLink ? "transparent" : "#C2ABAB",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
          onClick={() => topNews && handleNewsClick(topNews)}
        >
          <div className="gradient-overlay"></div>
          {topNews && (
            <div className="main-news-content">
              <h2 className="main-news-title">{topNews.title}</h2>
              <p className="main-news-category">
                {categoryMap[category] || "최신"} ·{" "}
                {topNews.uploadAt
                  ? new Date(topNews.uploadAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </p>

              {/* AI 버튼과 좋아요 버튼 */}
              <div
                className="main-news-actions"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  display: "flex",
                  gap: "10px",
                  zIndex: 10,
                }}
              >
                <button
                  className="ai-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAiSummary(topNews);
                  }}
                  title="AI 요약"
                  style={{
                    padding: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Brain size={16} color="#3b82f6" />
                </button>

                <OptimizedLikeButton
                  newsItem={topNews}
                  onLike={handleTopNewsLike}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 컨테이너 */}
      <div className="right-container">
        {/* 첫 번째 박스 */}
        <div className="right-box">
          {Array.from({ length: 3 }).map((_, subIndex) => {
            const newsItem = rightSectionNews[subIndex];
            return newsItem ? (
              <OptimizedNewsItem
                key={`news-item-${newsItem.crawlingId}`}
                newsItem={newsItem}
                onAiSummary={handleAiSummary}
                onNewsClick={handleNewsClick}
                truncateText={truncateText}
              />
            ) : (
              <div key={`empty-${subIndex}`} className="sub-box"></div>
            );
          })}
        </div>

        {/* 두 번째 박스 */}
        <div className="right-box">
          {Array.from({ length: 3 }).map((_, subIndex) => {
            const newsItem = rightSectionNews[3 + subIndex];
            return newsItem ? (
              <OptimizedNewsItem
                key={`news-item-${newsItem.crawlingId}`}
                newsItem={newsItem}
                onAiSummary={handleAiSummary}
                onNewsClick={handleNewsClick}
                truncateText={truncateText}
              />
            ) : (
              <div key={`empty-${3 + subIndex}`} className="sub-box"></div>
            );
          })}
        </div>

        {/* 세 번째 박스 */}
        <div className="right-box">
          {Array.from({ length: 3 }).map((_, subIndex) => {
            const newsItem = rightSectionNews[6 + subIndex];
            return newsItem ? (
              <OptimizedNewsItem
                key={`news-item-${newsItem.crawlingId}`}
                newsItem={newsItem}
                onAiSummary={handleAiSummary}
                onNewsClick={handleNewsClick}
                truncateText={truncateText}
              />
            ) : (
              <div key={`empty-${6 + subIndex}`} className="sub-box"></div>
            );
          })}
        </div>

        {/* 네 번째 박스 */}
        <div className="right-box">
          {Array.from({ length: 3 }).map((_, subIndex) => {
            const newsItem = rightSectionNews[9 + subIndex];
            return newsItem ? (
              <OptimizedNewsItem
                key={`news-item-${newsItem.crawlingId}`}
                newsItem={newsItem}
                onAiSummary={handleAiSummary}
                onNewsClick={handleNewsClick}
                truncateText={truncateText}
              />
            ) : (
              <div key={`empty-${9 + subIndex}`} className="sub-box"></div>
            );
          })}
        </div>

        {/* 다섯 번째 박스 */}
        <div className="right-box">
          {Array.from({ length: 3 }).map((_, subIndex) => {
            const newsItem = rightSectionNews[12 + subIndex];
            return newsItem ? (
              <OptimizedNewsItem
                key={`news-item-${newsItem.crawlingId}`}
                newsItem={newsItem}
                onAiSummary={handleAiSummary}
                onNewsClick={handleNewsClick}
                truncateText={truncateText}
              />
            ) : (
              <div key={`empty-${12 + subIndex}`} className="sub-box"></div>
            );
          })}
        </div>

        {/* 여섯 번째 박스 - 미니 캘린더 */}
        <div className="right-box calendar-box">
          <MiniCalendar />
        </div>
      </div>

      {/* 뉴스 모달 */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        newsData={activeNewsData}
      />
    </div>
  );
};

export default NewsPage;

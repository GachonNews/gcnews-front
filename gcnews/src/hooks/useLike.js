// src/hooks/useLike.js
import { useState, useCallback, useRef } from "react";
import { postLike, deleteLike } from "../apis/like";

const useLike = () => {
  const [likedNews, setLikedNews] = useState(new Map()); // Set 대신 Map 사용
  const [loading, setLoading] = useState(false);
  const processingRef = useRef(new Set()); // 현재 처리 중인 뉴스 ID들

  // 좋아요 상태 확인
  const isLiked = useCallback(
    (newsId) => {
      const result = likedNews.has(newsId);
      console.log(`isLiked check for ${newsId}:`, result);
      return result;
    },
    [likedNews]
  );

  // 좋아요 토글 (추가/삭제)
  const toggleLike = useCallback(
    async (newsItem) => {
      const newsId = newsItem.crawlingId; // crawlingId를 고유 식별자로 사용
      const crawlingId = newsItem.crawlingId;

      // 이미 처리 중인 뉴스인지 확인
      if (processingRef.current.has(newsId)) {
        console.log(`뉴스 ${newsId}는 이미 처리 중입니다.`);
        return { success: false, error: "이미 처리 중입니다." };
      }

      // 처리 중 목록에 추가
      processingRef.current.add(newsId);

      const currentlyLiked = likedNews.has(newsId);

      console.log("좋아요 토글 시작:", {
        newsId,
        crawlingId,
        currentlyLiked,
        title: newsItem.title,
        currentLikedNews: Array.from(likedNews.keys()),
      });

      setLoading(true);

      try {
        let apiSuccess = false;

        try {
          if (currentlyLiked) {
            // 좋아요 취소
            await deleteLike(crawlingId);
            console.log("좋아요 취소 API 성공:", newsItem.title);
            apiSuccess = true;
          } else {
            // 좋아요 추가
            await postLike(crawlingId);
            console.log("좋아요 추가 API 성공:", newsItem.title);
            apiSuccess = true;
          }
        } catch (apiError) {
          console.error("API 호출 실패:", apiError);

          // 409 에러의 경우 이미 해당 상태라는 의미이므로 UI만 동기화
          if (apiError.response?.status === 409) {
            console.log("409 에러 - 상태 동기화 진행");
            apiSuccess = true; // UI 업데이트는 진행
          } else {
            throw apiError; // 다른 에러는 상위로 전파
          }
        }

        // API 호출이 성공했거나 409 에러인 경우 UI 상태 업데이트
        if (apiSuccess) {
          setLikedNews((prevLikedNews) => {
            const newLikedNews = new Map(prevLikedNews);
            if (currentlyLiked) {
              newLikedNews.delete(newsId);
              console.log(`뉴스 ${newsId} 좋아요 취소됨`);
            } else {
              newLikedNews.set(newsId, true);
              console.log(`뉴스 ${newsId} 좋아요 추가됨`);
            }
            console.log(
              "업데이트된 좋아요 목록:",
              Array.from(newLikedNews.keys())
            );
            return newLikedNews;
          });

          return { success: true, isLiked: !currentlyLiked };
        }
      } catch (error) {
        console.error("좋아요 처리 실패:", error);

        // 에러 반환
        return {
          success: false,
          error: error.message || "좋아요 처리 중 오류가 발생했습니다.",
          isLiked: currentlyLiked, // 기존 상태 유지
        };
      } finally {
        setLoading(false);
        // 처리 중 목록에서 제거
        processingRef.current.delete(newsId);
      }
    },
    [likedNews]
  );

  // 좋아요 상태 초기화 (사용자 로그인 시 또는 페이지 로드 시)
  const initializeLikedNews = useCallback((likedNewsIds) => {
    const newMap = new Map();
    likedNewsIds.forEach((id) => newMap.set(id, true));
    setLikedNews(newMap);
    console.log("좋아요 상태 초기화:", likedNewsIds);
  }, []);

  // 특정 뉴스의 좋아요 상태만 업데이트
  const updateSingleLike = useCallback((newsId, isLiked) => {
    setLikedNews((prevLikedNews) => {
      const newLikedNews = new Map(prevLikedNews);
      if (isLiked) {
        newLikedNews.set(newsId, true);
      } else {
        newLikedNews.delete(newsId);
      }
      console.log(`뉴스 ${newsId} 상태 개별 업데이트:`, isLiked);
      return newLikedNews;
    });
  }, []);

  // 모든 좋아요 상태 초기화
  const clearAllLikes = useCallback(() => {
    setLikedNews(new Map());
    console.log("모든 좋아요 상태 초기화");
  }, []);

  return {
    likedNews,
    loading,
    isLiked,
    toggleLike,
    initializeLikedNews,
    updateSingleLike,
    clearAllLikes,
  };
};

export default useLike;

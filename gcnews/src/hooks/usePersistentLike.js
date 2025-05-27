// src/hooks/usePersistentLike.js
import { useState, useEffect, useCallback } from "react";
import { postLike, deleteLike } from "../apis/like";

const LIKED_NEWS_KEY = "likedNews";

const usePersistentLike = (crawlingId) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 로컬 스토리지에서 좋아요 상태 가져오기
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem(LIKED_NEWS_KEY);
      if (savedLikes) {
        const likedNewsIds = JSON.parse(savedLikes);
        setIsLiked(likedNewsIds.includes(crawlingId));
      }
    } catch (error) {
      console.error("로컬 스토리지에서 좋아요 상태 가져오기 실패:", error);
    }
  }, [crawlingId]);

  // 로컬 스토리지에 좋아요 상태 저장
  const saveLikeStatus = useCallback(
    (liked) => {
      try {
        const savedLikes = localStorage.getItem(LIKED_NEWS_KEY);
        let likedNewsIds = savedLikes ? JSON.parse(savedLikes) : [];

        if (liked) {
          // 좋아요 추가
          if (!likedNewsIds.includes(crawlingId)) {
            likedNewsIds.push(crawlingId);
          }
        } else {
          // 좋아요 제거
          likedNewsIds = likedNewsIds.filter((id) => id !== crawlingId);
        }

        localStorage.setItem(LIKED_NEWS_KEY, JSON.stringify(likedNewsIds));
      } catch (error) {
        console.error("로컬 스토리지에 좋아요 상태 저장 실패:", error);
      }
    },
    [crawlingId]
  );

  // 좋아요 토글 함수
  const toggleLike = useCallback(async () => {
    if (isProcessing) return;

    setIsProcessing(true);
    const currentLikedState = isLiked;

    // 낙관적 업데이트 - UI를 먼저 변경
    setIsLiked(!currentLikedState);
    saveLikeStatus(!currentLikedState);

    try {
      if (currentLikedState) {
        // 좋아요 취소
        await deleteLike(crawlingId);
        console.log("좋아요 취소 성공:", crawlingId);
      } else {
        // 좋아요 추가
        await postLike(crawlingId);
        console.log("좋아요 추가 성공:", crawlingId);
      }
    } catch (error) {
      console.error("좋아요 API 호출 실패:", error);

      // 409 에러 처리
      if (error.response?.status === 409) {
        console.log("409 에러 - 서버와 상태가 다름, 현재 상태 유지");
        // 409 에러인 경우 현재 UI 상태를 유지 (서버와 동기화됨)
      } else {
        // 다른 에러인 경우 원래 상태로 복구
        setIsLiked(currentLikedState);
        saveLikeStatus(currentLikedState);

        const action = currentLikedState ? "취소" : "추가";
        alert(`좋아요 ${action} 중 오류가 발생했습니다. 다시 시도해주세요.`);
      }
    } finally {
      setTimeout(() => {
        setIsProcessing(false);
      }, 300);
    }
  }, [crawlingId, isLiked, isProcessing, saveLikeStatus]);

  return {
    isLiked,
    isProcessing,
    toggleLike,
  };
};

export default usePersistentLike;

// src/components/NewsItem.jsx
import React, { memo, useState, useCallback } from "react";
import { Brain, Heart } from "lucide-react";

const NewsItem = memo(
  ({
    newsItem,
    isLiked,
    onAiSummary,
    onNewsClick,
    onLike,
    likeLoading,
    truncateText,
  }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleLike = useCallback(
      async (e) => {
        e.stopPropagation();

        if (isProcessing || likeLoading) return;

        setIsProcessing(true);

        try {
          await onLike(newsItem);
        } catch (error) {
          console.error("좋아요 처리 실패:", error);
        } finally {
          setTimeout(() => {
            setIsProcessing(false);
          }, 300);
        }
      },
      [newsItem, onLike, isProcessing, likeLoading]
    );

    const handleAiSummary = useCallback(
      (e) => {
        e.stopPropagation();
        onAiSummary(newsItem);
      },
      [newsItem, onAiSummary]
    );

    const handleClick = useCallback(() => {
      onNewsClick(newsItem);
    }, [newsItem, onNewsClick]);

    if (!newsItem) return null;

    // 렌더링 로그 (개발 시에만)
    if (import.meta.env.NODE_ENV === "development") {
      console.log(
        `NewsItem ${newsItem.crawlingId} rendered - isLiked: ${isLiked}`
      );
    }

    return (
      <div
        className="sub-box"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="news-item-content">
          <p className="news-item-title">{truncateText(newsItem.title)}</p>
          <div className="news-action-buttons">
            <button
              className="ai-button"
              onClick={handleAiSummary}
              title="AI 요약"
            >
              <Brain size={14} />
            </button>
            <button
              className={`heart-button ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
              title={isLiked ? "좋아요 취소" : "좋아요"}
              disabled={isProcessing || likeLoading}
            >
              <Heart
                size={14}
                fill={isLiked ? "#ff4757" : "none"}
                color={isLiked ? "#ff4757" : "#999"}
              />
            </button>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // 커스텀 비교 함수로 불필요한 렌더링 방지
    return (
      prevProps.newsItem?.crawlingId === nextProps.newsItem?.crawlingId &&
      prevProps.isLiked === nextProps.isLiked &&
      prevProps.likeLoading === nextProps.likeLoading
    );
  }
);

NewsItem.displayName = "NewsItem";

export default NewsItem;

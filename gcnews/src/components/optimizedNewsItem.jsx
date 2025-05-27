// src/components/OptimizedNewsItem.jsx
import React, { memo, useState, useCallback } from "react";
import { Brain, Heart } from "lucide-react";
import usePersistentLike from "../hooks/usePersistentLike";

const OptimizedNewsItem = memo(
  ({ newsItem, onAiSummary, onNewsClick, truncateText }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const {
      isLiked,
      isProcessing: likeProcessing,
      toggleLike,
    } = usePersistentLike(newsItem.crawlingId);

    const handleLike = useCallback(
      async (e) => {
        e.stopPropagation();

        if (isProcessing || likeProcessing) return;

        setIsProcessing(true);

        try {
          await toggleLike();
        } catch (error) {
          console.error("좋아요 처리 실패:", error);
        } finally {
          setTimeout(() => {
            setIsProcessing(false);
          }, 300);
        }
      },
      [toggleLike, isProcessing, likeProcessing]
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
              disabled={isProcessing || likeProcessing}
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
    // 뉴스 아이템이 같으면 리렌더링하지 않음
    return prevProps.newsItem?.crawlingId === nextProps.newsItem?.crawlingId;
  }
);

OptimizedNewsItem.displayName = "OptimizedNewsItem";

export default OptimizedNewsItem;

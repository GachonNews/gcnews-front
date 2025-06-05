// src/components/OptimizedLikeButton.jsx
import React from "react";
import { Heart } from "lucide-react";
import usePersistentLike from "../hooks/usePersistentLike";

const OptimizedLikeButton = ({ newsItem, onLike, style = {} }) => {
  const { isLiked, isProcessing, toggleLike } = usePersistentLike(
    newsItem.crawlingId
  );

  const handleLike = async (e) => {
    e.stopPropagation();

    const previousState = isLiked;
    await toggleLike();

    // 부모 컴포넌트에 알림 (필요시)
    if (onLike) {
      onLike(newsItem, !previousState);
    }
  };

  const defaultStyle = {
    padding: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "none",
    borderRadius: "50%",
    cursor: isProcessing ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    opacity: isProcessing ? 0.7 : 1,
    ...style,
  };

  return (
    <button
      className={`heart-button ${isLiked ? "liked" : ""}`}
      onClick={handleLike}
      title={isLiked ? "좋아요 취소" : "좋아요"}
      disabled={isProcessing}
      style={defaultStyle}
    >
      <Heart
        size={16}
        fill={isLiked ? "#ff4757" : "none"}
        color={isLiked ? "#ff4757" : "#999"}
      />
    </button>
  );
};

export default OptimizedLikeButton;

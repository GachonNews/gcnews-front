// src/components/NewsModal.jsx
import React, { useState } from "react";
import "./NewsModal.css";

const NewsModal = ({ isOpen, onClose, newsData }) => {
  const [showQuiz, setShowQuiz] = useState(false);

  if (!isOpen) return null;

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  const handleClose = () => {
    setShowQuiz(false);
    onClose();
  };

  // 퀴즈 모달 UI
  if (showQuiz) {
    return (
      <div className="news-modal-overlay">
        <div className="news-modal-content">
          <button className="news-modal-close" onClick={handleClose}>
            ×
          </button>

          <div className="news-modal-body">
            <div className="top-divider"></div>

            <h2 className="news-title">
              {newsData?.title || "뉴스 제목이 들어갈 자리입니다"}
            </h2>
            <p className="news-date">
              {newsData?.category || "분야"} · {newsData?.date || "0000.00.00"}
            </p>

            <div className="news-body">
              <p>
                퀴즈가 들어갈 자리입니다. 퀴즈가 들어갈 자리입니다. 퀴즈가
                들어갈 자리입니다. 퀴즈가 들어갈 자리입니다. 퀴즈가 들어갈
                자리입니다. 퀴즈가 들어갈 자리입니다.
              </p>
            </div>

            <div className="news-quiz">
              <div className="quiz-option">
                <input type="checkbox" id="option-o" name="quiz" value="O" />
                <label htmlFor="option-o">O</label>
              </div>
              <div className="quiz-option">
                <input type="checkbox" id="option-x" name="quiz" value="X" />
                <label htmlFor="option-x">X</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 기본 뉴스 모달 UI
  return (
    <div className="news-modal-overlay">
      <div className="news-modal-content">
        <button className="news-modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="news-modal-body">
          <div className="top-divider"></div>

          <h2 className="news-title">
            {newsData?.title || "뉴스 제목이 들어갈 자리입니다"}
          </h2>
          <p className="news-date">
            {newsData?.category || "분야"} · {newsData?.date || "0000.00.00"}
          </p>

          <div className="news-body">
            <p>
              {newsData?.content ||
                "뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다"}
            </p>
          </div>
        </div>

        <div className="news-footer-section">
          <div className="bottom-divider"></div>
          <div className="news-footer">
            <p className="news-question">뉴스가 잘 이해됐는지 궁금하다면?</p>
            <button className="news-quiz-btn" onClick={handleQuizButtonClick}>
              뉴스 퀴즈 풀러 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;

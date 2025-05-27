// src/components/NewsModal.jsx
import React, { useState } from "react";
import "./NewsModal.css";

const NewsModal = ({ isOpen, onClose, newsData }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // 선택한 답안
  const [showResult, setShowResult] = useState(false); // 결과 표시 여부

  if (!isOpen) return null;

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
    setSelectedAnswer(null); // 퀴즈 시작시 초기화
    setShowResult(false);
  };

  const handleClose = () => {
    setShowQuiz(false);
    setSelectedAnswer(null);
    setShowResult(false);
    onClose();
  };

  // 답안 선택 핸들러
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(false); // 새로운 답안 선택시 결과 숨김
  };

  // 정답 확인 핸들러
  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  // 정답 여부 확인
  const isCorrect = selectedAnswer === newsData?.quizAnswer;

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return "0000.00.00";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 퀴즈 모달 UI
  if (showQuiz) {
    return (
      <div className="news-modal-overlay">
        <div className="news-modal-content">
          <div className="top-divider"></div>
          <button className="news-modal-close" onClick={handleClose}>
            ×
          </button>

          <div className="news-modal-body">
            <h2 className="news-title">
              {newsData?.title || "뉴스 제목이 들어갈 자리입니다"}
            </h2>
            <p className="news-date">
              {newsData?.category || "분야"} · {formatDate(newsData?.uploadAt)}
            </p>

            <div className="news-body">
              <p>{newsData?.quizQuestion || "퀴즈가 들어갈 자리입니다."}</p>
            </div>

            <div className="news-quiz">
              <div className="quiz-option">
                <input
                  type="radio"
                  id="option-o"
                  name="quiz"
                  value={true}
                  checked={selectedAnswer === true}
                  onChange={() => handleAnswerSelect(true)}
                />
                <label htmlFor="option-o">O</label>
              </div>
              <div className="quiz-option">
                <input
                  type="radio"
                  id="option-x"
                  name="quiz"
                  value={false}
                  checked={selectedAnswer === false}
                  onChange={() => handleAnswerSelect(false)}
                />
                <label htmlFor="option-x">X</label>
              </div>
            </div>

            {/* 결과 표시 */}
            {showResult && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                <p
                  style={{
                    color: isCorrect ? "#4575f6" : "#ff0000",
                    margin: "10px 0",
                  }}
                >
                  {isCorrect ? "정답입니다!" : "오답입니다!"}
                </p>
              </div>
            )}
          </div>

          <div className="news-footer-section">
            <div className="news-footer">
              <button
                className="news-answer-btn"
                onClick={handleCheckAnswer}
                disabled={selectedAnswer === null}
                style={{
                  opacity: selectedAnswer === null ? 0.5 : 1,
                  cursor: selectedAnswer === null ? "not-allowed" : "pointer",
                }}
              >
                정답 확인
              </button>
            </div>
          </div>
          <div className="bottom-divider"></div>
        </div>
      </div>
    );
  }

  // 기본 뉴스 모달 UI
  return (
    <div className="news-modal-overlay">
      <div className="news-modal-content">
        <div className="top-divider"></div>
        <button className="news-modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="news-modal-body">
          <h2 className="news-title">
            {newsData?.title || "뉴스 제목이 들어갈 자리입니다"}
          </h2>
          <p className="news-date">
            {newsData?.category || "분야"} · {formatDate(newsData?.uploadAt)}
          </p>

          <div className="news-body">
            <p>{newsData?.content || "뉴스 요약 내용이 들어갈 예정입니다."}</p>
          </div>
        </div>

        <div className="news-footer-section">
          <div className="news-footer">
            <p className="news-question">뉴스가 잘 이해됐는지 궁금하다면?</p>
            <button
              className="news-quiz-btn"
              onClick={handleQuizButtonClick}
              disabled={!newsData?.quizQuestion} // 퀴즈가 없으면 비활성화
              style={{
                opacity: !newsData?.quizQuestion ? 0.5 : 1,
                cursor: !newsData?.quizQuestion ? "not-allowed" : "pointer",
              }}
            >
              뉴스 퀴즈 풀러 가기
            </button>
          </div>
        </div>
        <div className="bottom-divider"></div>
      </div>
    </div>
  );
};

export default NewsModal;

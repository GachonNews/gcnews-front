// src/pages/NewsPage.jsx
import React, { useState } from "react";
import NewsModal from "../components/NewsModal";
import "./NewsPage.css";

const NewsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNewsData, setActiveNewsData] = useState(null);

  // 샘플 뉴스 데이터
  const sampleNewsData = [
    {
      id: 1,
      title: "뉴스 제목이 들어갈 자리입니다",
      category: "분야",
      date: "0000.00.00",
      content:
        "뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다 뉴스 요약 내용이 들어갈 예정입니다",
    },
  ];

  const openModal = (newsId) => {
    // 클릭한 뉴스의 데이터 찾기
    const newsData = sampleNewsData.find((news) => news.id === newsId);
    setActiveNewsData(newsData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="news-home">
      {/* 왼쪽 큰 박스 */}
      <div className="left-container">
        <div
          className="main-article-box"
          onClick={() => openModal(1)} // 기본 뉴스 모달
        ></div>
      </div>

      {/* 오른쪽 컨테이너 */}
      <div className="right-container">
        {/* 첫 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
        </div>

        {/* 두 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
        </div>

        {/* 세 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
        </div>

        {/* 네 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
        </div>

        {/* 다섯 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
        </div>

        {/* 여섯 번째 큰 박스 */}
        <div className="right-box" onClick={() => openModal(1)}>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
          <div className="sub-box"></div>
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

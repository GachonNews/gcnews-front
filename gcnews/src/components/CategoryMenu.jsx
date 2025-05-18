// components/CategoryMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CategoryMenu.css";

const CategoryMenu = () => {
  return (
    <div className="category-menu-container">
      <div className="categories">
        <ul>
          <li className="active">
            <Link to="/news">최신</Link>
          </li>
          <li>
            <Link to="/news/economy">경제</Link>
          </li>
          <li>
            <Link to="/news/finance">금융</Link>
          </li>
          <li>
            <Link to="/news/industry">산업</Link>
          </li>
          <li>
            <Link to="/news/retail">유통</Link>
          </li>
          <li>
            <Link to="/news/it">IT</Link>
          </li>
          <li>
            <Link to="/news/global">국제</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu;

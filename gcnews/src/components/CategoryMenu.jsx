// components/CategoryMenu.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./CategoryMenu.css";

const CategoryMenu = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("latest");

  // Update active category based on URL path when component mounts or URL changes
  useEffect(() => {
    const path = location.pathname;
    if (path === "/news") {
      setActiveCategory("latest");
    } else if (path.startsWith("/news/")) {
      const category = path.split("/news/")[1];
      setActiveCategory(category);
    }
  }, [location.pathname]);

  // Categories mapping for easier maintenance
  const categories = [
    { id: "latest", name: "최신", path: "/news" },
    { id: "economy", name: "경제", path: "/news/economy" },
    { id: "financial-market", name: "금융", path: "/news/financial-market" },
    { id: "industry", name: "산업", path: "/news/industry" },
    { id: "distribution", name: "유통", path: "/news/distribution" },
    { id: "it", name: "IT", path: "/news/it" },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div className="category-menu-container">
      <div className="categories">
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className={activeCategory === category.id ? "active" : ""}
            >
              <Link
                to={category.path}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu;

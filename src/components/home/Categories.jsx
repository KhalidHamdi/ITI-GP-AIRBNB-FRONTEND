import React, { useRef, useState, useEffect } from 'react';
import { categoryData } from '../../assets/category'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Categories.css'; 
import Filters from './Filters'; 

const Categories = () => {
  const categories = categoryData.categoryBar.categories; 
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200, 
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const scrollLeftPosition = scrollRef.current.scrollLeft;
    const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

    setShowLeftArrow(scrollLeftPosition > 0);
    setShowRightArrow(scrollLeftPosition < maxScrollLeft);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener('scroll', handleScroll);

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="categories-wrapper d-flex align-items-center">
      {showLeftArrow && (
        <button className="btn btn-outline-secondary scroll-btn" onClick={scrollLeft}>
          <i className="bi bi-chevron-left"></i>
        </button>
      )}

      <div
        className="d-flex overflow-auto py-2 categories-bar"
        ref={scrollRef}
      >
        {categories.map((category) => (
          <div key={category.title} className="text-center category-item">
            <img src={category.imageUrl} alt={category.title} className="img-fluid category-icon" />
            <p className="category-title">{category.title}</p>
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button className="btn btn-outline-secondary scroll-btn" onClick={scrollRight}>
          <i className="bi bi-chevron-right"></i>
        </button>
      )}

      <Filters /> 
    </div>
  );
};

export default Categories;

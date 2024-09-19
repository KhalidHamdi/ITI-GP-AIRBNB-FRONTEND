import React from 'react';
import './Filters.css'; 

const Filters = () => {
  return (
    <div className="filters-container">
      <button className="filters-button">
        <i className="fa-solid fa-sliders filters-icon"></i>
        Filters
      </button>

      <button className="filters-toggle-button">
        <span className="filters-text">Display Total Before Taxes</span>
        <div className="custom-toggle-border">
          <input
            className="custom-toggle-input"
            type="checkbox"
            id="toggleSwitch"
          />
        </div>
      </button>
    </div>
  );
};

export default Filters;

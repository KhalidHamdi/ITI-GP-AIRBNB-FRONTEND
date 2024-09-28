import React from 'react';
import './Filters.css'; 
import { useDispatch } from 'react-redux';
import { openFilterModal } from '../../redux/modalSlice';

const Filters = () => {
  const dispatch = useDispatch();

  const filterClick = () => {
    dispatch(openFilterModal());
    console.log('filter clicked !')
};

  return (
    <div className="filters-container">
      <button className="filters-button" onClick={filterClick}>
        <i className="fa-solid fa-sliders filters-icon"></i>
        Filters
      </button>
    </div>
  );
};

export default Filters;

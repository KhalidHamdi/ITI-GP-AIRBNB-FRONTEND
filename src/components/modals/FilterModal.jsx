import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux';
import { closeFilterModal } from '../../redux/modalSlice';
import axiosInstance from '../../axios';

const FilterModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.filterModalOpen);

  const [country, setCountry] = useState('');
  const [guests, setGuests] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  const close = () => {
    console.log("Closing FilterModal");
    dispatch(closeFilterModal());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetching filtered properties
      const response = await axiosInstance.get("/api/properties/", {
        params: {
          country, 
          guests, 
          minprice: minPrice,  
          maxprice: maxPrice   
        },
      });

      console.log('Filtered properties:', response.data);
      
      // Close the filter modal
      dispatch(closeFilterModal()); 

      // Navigate back to the main page and pass the filtered properties
      navigate('/', {
        state: { 
          properties: response.data.data // Send the filtered properties data
        }
      });
  
    } catch (error) {
      console.error('Failed to fetch filtered properties:', error);
    }
  };
  
  // For Debugging - Check if component renders
  console.log("FilterModal Rendered. isOpen:", isOpen);

  const content = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          className="form-control"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
        />
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of Guests</label>
        <input
          type="number"
          id="guests"
          className="form-control"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
        />
      </div>

      <div className="form-group">
        <label>Price Range: {minPrice} - {maxPrice}</label>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="3000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="range"
            min="0"
            max="3000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Apply Filters</button>
    </form>
  );

  return (
    <>
      <div style={{ display: 'none' }}>Filter Modal Component</div>
      
      <Modal 
        isOpen={isOpen} 
        close={close} 
        label="Filters" 
        content={content} 
      />
    </>
  );
};

export default FilterModal;

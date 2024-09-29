import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeFilterModal } from '../../redux/modalSlice';
import axiosInstance from '../../axios';
import Modal from './Modal';

const FilterModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modal.filterModalOpen);

    const [country, setCountry] = useState('');
    const [guests, setGuests] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(3000);

    const close = () => {
        dispatch(closeFilterModal());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Fetch filtered properties from the backend
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

            navigate('/api/properties/', { 
                state: {
                    properties: response.data.data
                }
            });

        } catch (error) {
            console.error('Failed to fetch filtered properties:', error);
        }
    };

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

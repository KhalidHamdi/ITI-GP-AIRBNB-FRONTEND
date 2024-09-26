import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from './categories';
import axiosInstance from "../../axios";
import { closeLoginModal } from '../../redux/modalSlice'; 
import { useNavigate } from 'react-router-dom';
import countries from 'world-countries';

const SelectCountry = ({ value, onChange }) => {
    const formattedCountries = countries.map((country) => ({
        value: country.cca2,
        label: country.name.common,
    }));

    const handleChange = (event) => {
        const selectedCountry = formattedCountries.find(
            (country) => country.value === event.target.value
        );
        onChange(selectedCountry);
    };

    return (
        <div className="form-group">
            <label htmlFor="countrySelect">Select Country</label>
            <select
                id="countrySelect"
                className="form-control"
                value={value?.value || ""}
                onChange={handleChange}
            >
                <option value="">Anywhere</option>
                {formattedCountries.map((country) => (
                    <option key={country.value} value={country.value}>
                        {country.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

const AddProperty = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState([]);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState(null);
    const [dataImage, setDataImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const isOpen = useSelector((state) => state.modal.isOpen); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setCategory = (category) => {
        setDataCategory(category);
    };

    const setImage = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];
            setDataImage(tmpImage);
        }
    };

    const submitForm = async () => {
        if (dataCategory && dataTitle && dataDescription && dataPrice && dataCountry && dataImage) {
            const formData = new FormData();
            formData.append('category', dataCategory);
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuests);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('image', dataImage);

            try {
                const response = await axiosInstance.post('/api/properties/create/', formData);

                if (response.status === 200 || response.status === 201) {
                    setErrors([]);
                    setSuccessMessage('Property added successfully!');
                    setTimeout(() => {
                        setSuccessMessage('');
                        navigate('/');
                        dispatch(closeLoginModal());  
                    }, 2000);
                } else {
                    const tmpErrors = Array.isArray(response.data.message)
                        ? response.data.message
                        : Object.values(response.data.message).map((error) => error.toString());
                    setErrors(tmpErrors);
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    const tmpErrors = Array.isArray(error.response.data.message)
                        ? error.response.data.message
                        : Object.values(error.response.data.message).map((err) => err.toString());
                    setErrors(tmpErrors);
                } else {
                    setErrors(['An unexpected error occurred. Please try again.']);
                }
            }
        } else {
            setErrors(['Please fill out all required fields before submitting.']);
        }
    };

    const CustomButton = ({ label, className, onClick }) => {
        return (
            <div 
                onClick={onClick}
                className={`btn btn-primary w-100 text-white text-center ${className}`}
                style={{ cursor: 'pointer' }}
            >
                {label}
            </div>
        );
    };

    return (
        isOpen && (
            <div className="modal show d-block" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Property</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => dispatch(closeLoginModal())}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {currentStep === 1 ? (
                                <>
                                    <h2 className="h4 mb-1 text-center">Which of these best describes your place?</h2>
                                    <Categories dataCategory={dataCategory} setCategory={setCategory} />
                                    <div className="d-flex justify-content-end mt-1">
                                        <button
                                            className="btn btn-danger text-white rounded-pill px-4 py-2"
                                            onClick={() => setCurrentStep(2)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            ) : currentStep === 2 ? (
                                <>
                                    <h2 className="mb-4 text-center">Tell Us About Your Space</h2>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            value={dataTitle}
                                            onChange={(e) => setDataTitle(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            value={dataDescription}
                                            onChange={(e) => setDataDescription(e.target.value)}
                                            className="form-control rounded"
                                            rows="4"
                                            placeholder="Describe your place in detail..."
                                        ></textarea>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <CustomButton
                                            label="Previous"
                                            onClick={() => setCurrentStep(1)}
                                            className="btn rounded-pill px-4 py-2 text-white bg-black"
                                        />
                                        <CustomButton
                                            label="Next"
                                            onClick={() => setCurrentStep(3)}
                                            className="btn btn-danger text-white rounded-pill px-4 py-2"
                                        />
                                    </div>
                                </>
                            ) : currentStep === 3 ? (
                                <>
                                    <h2 className="mb-4 text-center">Share some basics about your place</h2>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Price per night ($)</label>
                                        <input
                                            type="number"
                                            value={dataPrice}
                                            onChange={(e) => setDataPrice(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Bedrooms</label>
                                        <input
                                            type="number"
                                            value={dataBedrooms}
                                            onChange={(e) => setDataBedrooms(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Bathrooms</label>
                                        <input
                                            type="number"
                                            value={dataBathrooms}
                                            onChange={(e) => setDataBathrooms(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Number of guests</label>
                                        <input
                                            type="number"
                                            value={dataGuests}
                                            onChange={(e) => setDataGuests(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <CustomButton
                                            label="Previous"
                                            onClick={() => setCurrentStep(2)}
                                            className="btn rounded-pill px-4 py-2 text-white bg-black"
                                        />
                                        <CustomButton
                                            label="Next"
                                            onClick={() => setCurrentStep(4)}
                                            className="btn btn-danger text-white rounded-pill px-4 py-2"
                                        />
                                    </div>
                                </>
                            ) : currentStep === 4 ? (
                                <>
                                    <h2 className="mb-4 text-center">Location</h2>
                                    <SelectCountry
                                        value={dataCountry}
                                        onChange={setDataCountry}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <CustomButton
                                            label="Previous"
                                            onClick={() => setCurrentStep(3)}
                                            className="btn rounded-pill px-4 py-2 text-white bg-black"
                                        />
                                        <CustomButton
                                            label="Next"
                                            onClick={() => setCurrentStep(5)}
                                            className="btn btn-danger text-white rounded-pill px-4 py-2"
                                        />
                                    </div>
                                </>
                            ) : currentStep === 5 ? (
                                <>
                                    <h2 className="mb-4 text-center">Upload Image</h2>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Upload Image</label>
                                        <input
                                            type="file"
                                            onChange={setImage}
                                            className="form-control rounded"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <CustomButton
                                            label="Previous"
                                            onClick={() => setCurrentStep(4)}
                                            className="btn rounded-pill px-4 py-2 text-white bg-black"
                                        />
                                        <CustomButton
                                            label="Submit"
                                            onClick={submitForm}
                                            className="btn btn-success text-white rounded-pill px-4 py-2"
                                        />
                                    </div>
                                </>
                            ) : null}
    
                            {errors.length > 0 && (
                                <div className="alert alert-danger">
                                    {errors.map((error, index) => (
                                        <div key={index}>{error}</div>
                                    ))}
                                </div>
                            )}
                            {successMessage && (
                                <div className="alert alert-success">
                                    {successMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            )
        )
}
export default AddProperty;     
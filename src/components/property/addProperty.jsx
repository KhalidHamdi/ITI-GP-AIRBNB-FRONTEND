import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from './categories';
import axiosInstance from "../../axios";
import { closeAddPropertyModal } from '../../redux/modalSlice'; 
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
    const [dataCity, setDataCity] = useState(''); 
    const [dataAddress, setDataAddress] = useState(''); 
    const [dataImages, setDataImages] = useState([]); 
    const [successMessage, setSuccessMessage] = useState('');

    const isOpen = useSelector((state) => state.modal.addPropertyModalOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setCategory = (category) => {
        setDataCategory(category);
    };

    const setImages = (event) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files); 
            setDataImages(filesArray);
            console.log('Files selected:', filesArray); 
        }
    };

    const resetForm = () => {
        setDataCategory('');
        setDataTitle('');
        setDataDescription('');
        setDataPrice('');
        setDataBedrooms('');
        setDataBathrooms('');
        setDataGuests('');
        setDataCountry(null);
        setDataCity('');
        setDataAddress('');
        setDataImages([]);
    };

    const submitForm = async (event) => {
        event.preventDefault();

        if (!dataCategory || !dataTitle || !dataDescription || !dataPrice || !dataBedrooms || !dataBathrooms || !dataGuests || !dataCountry || !dataCity || !dataAddress) {
            setErrors(['Please fill out all required fields before submitting.']);
            return;
        }

        const formData = new FormData();
        
        formData.append('category', dataCategory);
        formData.append('title', dataTitle);
        formData.append('description', dataDescription);
        formData.append('price_per_night', dataPrice);
        formData.append('bedrooms', dataBedrooms);
        formData.append('bathrooms', dataBathrooms);
        formData.append('guests', dataGuests);
        formData.append('country', dataCountry?.label || "");
        formData.append('country_code', dataCountry?.value || "");
        formData.append('city', dataCity);
        formData.append('address', dataAddress);

        if (dataImages.length === 0) {
            setErrors(['At least one image is required.']);
            return; // Stop form submission
        }

        dataImages.forEach((image, index) => {
            formData.append('images', image); 
        });

        try {
            const response = await axiosInstance.post('/api/properties/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
            console.log('Success:', response.data);
            setErrors([]);
            setSuccessMessage('Property added successfully!');
            resetForm(); 
            dispatch(closeAddPropertyModal());
        } catch (error) {
            console.error('Error response:', error.response.data);
            if (error.response && error.response.data && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                console.error('Validation Errors:', validationErrors);
                const tmpErrors = Object.values(validationErrors).flat().map((err) => err.toString());
                setErrors(tmpErrors);
            } else {
                setErrors(['An unexpected error occurred. Please try again.']);
            }
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
                                onClick={() => dispatch(closeAddPropertyModal())}
                            ></button>
                        </div>
                        <div className="modal-body">
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
                                        <label className="form-label">Guests</label>
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
                                    <h2 className="mb-4 text-center">Where's your place located?</h2>
                                    <SelectCountry value={dataCountry} onChange={setDataCountry} />
                                    <div className="form-group mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            value={dataCity}
                                            onChange={(e) => setDataCity(e.target.value)}
                                            className="form-control rounded-pill"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="form-label">Full Address</label>
                                        <textarea
                                            value={dataAddress}
                                            onChange={(e) => setDataAddress(e.target.value)}
                                            className="form-control rounded"
                                            rows="2"
                                        ></textarea>
                                    </div>
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
                                    <h2 className="mb-4 text-center">Add photos of your place</h2>
                                    <div className="form-group mb-3">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={setImages}
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
                                            className="btn btn-danger text-white rounded-pill px-4 py-2"
                                        />
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddProperty;

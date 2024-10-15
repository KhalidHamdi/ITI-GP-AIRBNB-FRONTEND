// src/components/property/EditProperty.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from './categories'; // Ensure this path is correct
import axiosInstance from '../../axios';
import { closeEditPropertyModal } from '../../redux/modalSlice';
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
        value={value?.value || ''}
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

const EditProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const property = useSelector((state) => state.modal.propertyToEdit);
  const isOpen = useSelector((state) => state.modal.editPropertyModalOpen);

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

  useEffect(() => {
    if (property) {
      setDataCategory(property.category || '');
      setDataTitle(property.title || '');
      setDataDescription(property.description || '');
      setDataPrice(property.price_per_night || '');
      setDataBedrooms(property.bedrooms || '');
      setDataBathrooms(property.bathrooms || '');
      setDataGuests(property.guests || '');
      const selectedCountryObj = countries.find(
        (c) => c.cca2 === property.country_code
      );
      setDataCountry(
        selectedCountryObj
          ? { value: selectedCountryObj.cca2, label: selectedCountryObj.name.common }
          : null
      );
      setDataCity(property.city || '');
      setDataAddress(property.address || '');
      setDataImages([]); // Reset images unless user uploads new ones
      setCurrentStep(1);
      setErrors([]);
      setSuccessMessage('');
    }
  }, [property]);

  const setCategoryHandler = (category) => {
    setDataCategory(category);
  };

  const setImageHandler = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setDataImages(filesArray);
    }
  };

  const submitForm = async () => {
    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      dataPrice &&
      dataCountry &&
      dataCity &&
      dataAddress
    ) {
      const formData = new FormData();
      formData.append('category', String(dataCategory));
      formData.append('title', dataTitle);
      formData.append('description', dataDescription);
      formData.append('price_per_night', dataPrice);
      formData.append('bedrooms', dataBedrooms);
      formData.append('bathrooms', dataBathrooms);
      formData.append('guests', dataGuests);
      formData.append('country', dataCountry?.label);
      formData.append('country_code', dataCountry?.value);
      formData.append('city', dataCity);
      formData.append('address', dataAddress);

      // Append multiple images
      if (dataImages && dataImages.length > 0) {
        dataImages.forEach((image) => {
          formData.append('new_images', image);
        });
      }

      try {
        const response = await axiosInstance.put(
          `/api/properties/${property.id}/update/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setErrors([]);
          setSuccessMessage('Property updated successfully!');
          setTimeout(() => {
            setSuccessMessage('');
            navigate('/');
            dispatch(closeEditPropertyModal());
          }, 2000);
        } else {
          const tmpErrors = Array.isArray(response.data.message)
            ? response.data.message
            : Object.values(response.data.message).flat();
          setErrors(tmpErrors);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const tmpErrors = Object.values(error.response.data.errors).flat();
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
      <button
        type="button"
        onClick={onClick}
        className={`btn ${className}`}
      >
        {label}
      </button>
    );
  };

  if (!isOpen || !property) {
    return null;
  }

  return (
    <div className="modal show d-block" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Property</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => dispatch(closeEditPropertyModal())}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {currentStep === 1 && (
              <>
                <h2 className="h4 mb-1 text-center">
                  Which of these best describes your place?
                </h2>
                <Categories
                  dataCategory={dataCategory}
                  setCategory={setCategoryHandler}
                />
                <div className="d-flex justify-content-end mt-1">
                  <button
                    type="button"
                    className="btn btn-danger text-white rounded-pill px-4 py-2"
                    onClick={() => setCurrentStep(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h2 className="mb-4 text-center">Tell Us About Your Space</h2>
                <div className="form-group mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={dataTitle}
                    onChange={(e) => setDataTitle(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Enter property title"
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
            )}
            {currentStep === 3 && (
              <>
                <h2 className="mb-4 text-center">
                  Share some basics about your place
                </h2>
                <div className="form-group mb-3">
                  <label className="form-label">Price per night ($)</label>
                  <input
                    type="number"
                    value={dataPrice}
                    onChange={(e) => setDataPrice(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="e.g., 100"
                    min="0"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Bedrooms</label>
                  <input
                    type="number"
                    value={dataBedrooms}
                    onChange={(e) => setDataBedrooms(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Number of bedrooms"
                    min="0"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Bathrooms</label>
                  <input
                    type="number"
                    value={dataBathrooms}
                    onChange={(e) => setDataBathrooms(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Number of bathrooms"
                    min="0"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Number of guests</label>
                  <input
                    type="number"
                    value={dataGuests}
                    onChange={(e) => setDataGuests(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Maximum number of guests"
                    min="1"
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
            )}
            {currentStep === 4 && (
              <>
                <h2 className="mb-4 text-center">Enter Location Details</h2>
                <SelectCountry value={dataCountry} onChange={setDataCountry} />
                <div className="form-group mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={dataCity}
                    onChange={(e) => setDataCity(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Enter city"
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    value={dataAddress}
                    onChange={(e) => setDataAddress(e.target.value)}
                    className="form-control rounded-pill"
                    placeholder="Enter address"
                  />
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
            )}
            {currentStep === 5 && (
              <>
                <h2 className="mb-4 text-center">Upload Images</h2>
                <div className="form-group mb-3">
                  <label className="form-label">Upload Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={setImageHandler}
                    className="form-control"
                  />
                  {property.images && property.images.length > 0 && (
                    <div className="mt-3">
                      <h5>Current Images:</h5>
                      <div className="d-flex flex-wrap">
                        {property.images.map((img, index) => (
                          <img
                            key={index}
                            src={img.image}
                            alt={`Current ${index}`}
                            className="me-2 mb-2"
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {dataImages && dataImages.length > 0 && (
                    <div className="mt-3">
                      <h5>New Images to Upload:</h5>
                      <div className="d-flex flex-wrap">
                        {dataImages.map((img, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(img)}
                            alt={`Preview ${index}`}
                            className="me-2 mb-2"
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
            )}

            {/* Display Errors */}
            {errors.length > 0 && (
              <div className="alert alert-danger mt-3">
                {errors.map((error, index) => (
                  <p key={index} className="mb-1">
                    {error}
                  </p>
                ))}
              </div>
            )}

            {/* Display Success Message */}
            {successMessage && (
              <div className="alert alert-success mt-3">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeFilterModal } from "../../redux/modalSlice";
import axiosInstance from "../../axios";
import Modal from "./Modal";

const FilterModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.filterModalOpen);

  const [country, setCountry] = useState("");
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
          maxprice: maxPrice,
        },
      });

      console.log("Filtered properties:", response.data.results);

      // Close the filter modal
      dispatch(closeFilterModal());

      navigate("/", {
        state: {
          properties: response.data.results,
        },
      });
    } catch (error) {
      console.error("Failed to fetch filtered properties:", error);
    }
  };
  const content = (
    <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow-lg">
      {/* Country Input */}
      <div className="form-group mb-3">
        <label htmlFor="country" className="form-label fw-bold">
          Country
        </label>
        <input
          type="text"
          id="country"
          className="form-control border border-secondary"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
          style={{
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "#007bff")}
          onMouseLeave={(e) => (e.target.style.borderColor = "#ced4da")}
        />
      </div>

      {/* Guests Input */}
      <div className="form-group mb-3">
        <label htmlFor="guests" className="form-label fw-bold">
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          className="form-control border border-secondary"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          style={{
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "#007bff")}
          onMouseLeave={(e) => (e.target.style.borderColor = "#ced4da")}
        />
      </div>

      {/* Price Range */}
      <div className="form-group mb-3">
        <label className="form-label fw-bold">
          Price Range: {minPrice} - {maxPrice}
        </label>
        <div className="price-range d-flex justify-content-between align-items-center">
          <input
            type="range"
            min="0"
            max="3000"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="form-range"
            style={{
              appearance: "none",
              width: "45%",
              height: "8px",
              background: "#ddd",
              borderRadius: "5px",
              outline: "none",
              transition: "background 0.3s ease",
              marginTop: "20px",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#007bff")}
            onMouseLeave={(e) => (e.target.style.background = "#ddd")}
          />
          <input
            type="range"
            min="0"
            max="3000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="form-range"
            style={{
              appearance: "none",
              width: "45%",
              height: "8px",
              background: "#ddd",
              borderRadius: "5px",
              outline: "none",
              transition: "background 0.3s ease",
              marginTop: "20px",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#007bff")}
            onMouseLeave={(e) => (e.target.style.background = "#ddd")}
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-100 py-2"
        style={{
          transition: "background-color 0.3s ease, transform 0.2s",
          marginTop: "50px",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#0056b3";
          e.target.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.transform = "scale(1)";
        }}
      >
        Apply Filters
      </button>
    </form>
  );

  return (
    <>
      <div style={{ display: "none" }}>Filter Modal Component</div>
      <Modal isOpen={isOpen} close={close} label="Filters" content={content} />
    </>
  );
};

export default FilterModal;

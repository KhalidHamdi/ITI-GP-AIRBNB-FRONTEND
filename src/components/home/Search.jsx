import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

const Search = () => {
  const navigate = useNavigate(); // For navigation
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions when the input value changes
  const fetchSuggestions = async (query) => {
    try {
      const response = await axiosInstance.get(
        `/api/properties/`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchSuggestions(city);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true);
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch properties based on selected city and guests
      const response = await axiosInstance.get("/api/properties/", {
        params: { 
          country: city,
          guests,
        },
      });

      console.log("Filtered properties:", response.data.data);

      // Navigate to home with properties in state
      navigate("/", {
        state: {
          properties: response.data.data,
          city,   // Include the selected city in the state
          guests, // Include the number of guests in the state
        },
      });
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex w-100 justify-content-center ">
      <div
        className="d-flex rounded-pill border shadow-sm p-3 w-100"
        style={{ maxWidth: "750px", marginBottom: "10px" }}
      >
        <div className="flex-grow-1 border-end pe-3 position-relative">
          <div className="small fw-medium">Where</div>
          <input
            type="text"
            className="border-0 text-muted small"
            placeholder="Search destinations"
            style={{ outline: "none", width: "100%" }}
            value={city}
            onChange={handleCityChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100"
              style={{ top: "100%", zIndex: 1 }}
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: "pointer" }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Guests Input */}
        <div className="ms-3">
          <div className="small fw-medium">Guests</div>
          <input
            type="number"
            className="border-0 text-muted small"
            placeholder="Number of guests"
            value={guests}
            onChange={handleGuestsChange}
            min="1"
            style={{ outline: "none", width: "60px" }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-danger rounded-circle ms-2"
          style={{ width: "36px", height: "36px", padding: "0" }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;

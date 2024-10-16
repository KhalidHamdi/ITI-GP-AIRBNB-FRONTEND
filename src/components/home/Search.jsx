import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

const Search = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [guests, setGuests] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [useRecommendation, setUseRecommendation] = useState(false);
  const [properties, setProperties] = useState([]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axiosInstance.get(
        "/api/properties/search_suggestions/",
        {
          params: { query },
        }
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

  const handleRecommendationToggle = () => {
    setUseRecommendation(!useRecommendation);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guests < 1) {
      alert("Number of guests must be at least 1.");
      return;
    }

    try {
      let response;
      const normalizedCity = city.toLowerCase();

      if (useRecommendation) {
        response = await axiosInstance.get(
          "/api/properties/search_recommendation/",
          {
            params: {
              user_data: normalizedCity,
              query: normalizedCity,
            },
          }
        );
      } else {
        response = await axiosInstance.get("/api/properties/search/", {
          params: {
            city: normalizedCity,
            country: country.toLowerCase(),
            guests,
          },
        });
      }

      setProperties(response.data.data);
      navigate("/", {
        state: {
          properties: response.data.data,
          city,
          guests,
        },
      });
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex w-100 justify-content-center"
    >
      <div
        className="d-flex rounded-pill border shadow-sm p-2 w-100"
        style={{ maxWidth: "700px", marginBottom: "10px" }}
      >
        <div className="flex-grow-1 border-end ps-4 position-relative">
          <div className="small fw-medium">Where</div>
          <input
            type="text"
            className="border-0 text-muted small bg-transparent"
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

        <div className="ms-3 border-end">
          <div className="small fw-medium">Guests</div>
          <input
            type="number"
            className="border-0 text-muted bg-transparent"
            placeholder="Number of guests"
            value={guests}
            onChange={handleGuestsChange}
            min="1"
            style={{ outline: "none", width: "60px" }}
          />
        </div>

        <div className="ms-3">
          <label className="small fw-medium mt-2" style={{ fontSize: "12px" }}>
            Use Recommendations
            <input
              type="checkbox"
              className="ms-2"
              checked={useRecommendation}
              onChange={handleRecommendationToggle}
            />
          </label>
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

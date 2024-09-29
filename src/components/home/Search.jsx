// import React from "react";

// const Search = () => {
//   return (
//     <div className="d-flex w-100 justify-content-center">
//       <div
//         className="d-flex rounded-pill border shadow-sm p-4 w-100"
//         style={{ maxWidth: "850px" }}
//       >
//         <div className="flex-grow-1 border-end pe-3">
//           <div className="small fw-medium">Where</div>
//           <input
//             type="text"
//             className="border-0 text-muted small"
//             placeholder="Search destinations"
//             style={{ outline: "none", width: "100%" }}
//           />
//         </div>
//         <div className="px-3 border-end">
//           <div className="small fw-medium">Check in</div>
//           <div className="text-muted small">Add dates</div>
//         </div>
//         <div className="px-3 border-end">
//           <div className="small fw-medium">Check out</div>
//           <div className="text-muted small">Add dates</div>
//         </div>
//         <div className="flex-grow-1 ps-3">
//           <div className="small fw-medium">Who</div>
//           <div className="text-muted small">Add guests</div>
//         </div>
//         <button
//           className="btn btn-danger rounded-circle ms-2"
//           style={{ width: "36px", height: "36px", padding: "0" }}
//         >
//           <i className="bi bi-search"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Search;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [city, setCity] = useState("");
  const [guests, setGuests] = useState(1); // State to hold the number of guests
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions when the input value changes
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/properties/search_suggestions/?query=${query}`
      );

      setSuggestions(response.data);
      console.log("Fetched suggestions:", response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchSuggestions(city);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  }, [city]);

  // Handle input change for city
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setShowSuggestions(true);
  };

  // Handle input change for guests
  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion); // Set the clicked suggestion to the input
    setShowSuggestions(false); // Hide suggestions after selection
  };

  return (
    <div className="d-flex w-100 justify-content-center">
      <div
        className="d-flex rounded-pill border shadow-sm p-4 w-100"
        style={{ maxWidth: "850px" }}
      >
        <div className="flex-grow-1 border-end pe-3 position-relative">
          <div className="small fw-medium">Where</div>
          <input
            type="text"
            className="border-0 text-muted small"
            placeholder="Search destinations"
            style={{ outline: "none", width: "100%" }}
            value={city}
            onChange={handleCityChange} // Update input state and fetch suggestions
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions when focus is lost
            onFocus={() => setShowSuggestions(true)} // Show suggestions when the input is focused
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
                  onClick={() => handleSuggestionClick(suggestion)} // Handle click on suggestion
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
            onChange={handleGuestsChange} // Update guests state
            min="1" // Prevent negative or zero guests
            style={{ outline: "none", width: "60px" }}
          />
        </div>

        <button
          className="btn btn-danger rounded-circle ms-2"
          style={{ width: "36px", height: "36px", padding: "0" }}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>
    </div>
  );
};

export default Search;

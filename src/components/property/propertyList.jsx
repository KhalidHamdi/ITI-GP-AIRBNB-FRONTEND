// src/components/property/PropertyList.jsx

import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";
// import useFavorites from './useFavorites';

const PropertyList = ({
  landlord_id = null,
  selectedCategory,
  filteredProperties,
  updateSelectedCategory,
  isLandlordPage = false, // Default to false
}) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();

  // Fetch properties with pagination
  const getProperties = async (page = 1) => {
    let url = `/api/properties/?page=${page}`;

    if (landlord_id) {
      url += `&landlord_id=${landlord_id}`;
    }

    try {
      if (filteredProperties || location.state?.properties) {
        setProperties(filteredProperties || location.state.properties);
        setTotalPages(1); // No pagination needed
      } else {
        const response = await axiosInstance.get(
          selectedCategory
            ? `/api/properties/?category=${selectedCategory}&page=${page}`
            : url
        );
        setProperties(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 12)); // Assuming 12 per page
      }
    } catch (error) {
      setError("Failed to fetch properties.");
    }
  };

  useEffect(() => {
    getProperties(currentPage);
    console.log("The page rerendered");
  }, [
    landlord_id,
    currentPage,
    filteredProperties,
    selectedCategory,
    updateSelectedCategory,
    location.state?.properties,
  ]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getProperties(newPage);
    }
  };

  console.log("From PropertyList, the filter is:", filteredProperties);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className="col">
              <PropertyListItem property={property} isLandlordPage={isLandlordPage} />
            </div>
          ))
        ) : (
          <div className="col">
            <p>No Properties.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-3">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "50px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="btn btn-sm btn-outline-primary mx-2"
            >
              &laquo; Prev
            </button>

            <span className="mx-2">
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn btn-sm btn-outline-primary mx-2"
            >
              Next &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;

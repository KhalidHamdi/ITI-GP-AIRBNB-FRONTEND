import React, { useEffect, useState } from "react";
import PropertyListItem from "./PropertyListItem";
import axiosInstance from "../../axios";
import { useLocation } from "react-router-dom";

const PropertyList = ({
  landlord_id = null,
  selectedCategory,
  filteredProperties,
  updateSelectedCategory,
  isLandlordPage = false, 
}) => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const getProperties = async (page = 1) => {
    setLoading(true);
    let url = `/api/properties/?page=${page}`;

    if (landlord_id) {
      url += `&landlord_id=${landlord_id}`;
    }

    try {
      if (filteredProperties || location.state?.properties) {
        setProperties(filteredProperties || location.state.properties);
        setTotalPages(1); 
      } else {
        const response = await axiosInstance.get(
          selectedCategory
            ? `/api/properties/?category=${selectedCategory}&page=${page}`
            : url
        );
        setProperties(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 12)); 
      }
    } catch (error) {
      console.error("Fetch Properties Error:", error);
      setError("Failed to fetch properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    landlord_id,
    currentPage,
    filteredProperties,
    selectedCategory,
    updateSelectedCategory,
    location.state?.properties,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      getProperties(newPage);
    }
  };

  const handleDelete = (deletedPropertyId) => {
    setProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== deletedPropertyId)
    );
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="container my-4">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {properties.length > 0 &&
              properties.map((property) => (
                <div key={property.id} className="col">
                  <PropertyListItem
                    property={property}
                    isLandlordPage={isLandlordPage}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
          </div>

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

                <span className="small">
                  Page {currentPage} of {totalPages}
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
        </>
      )}
    </div>
  );
};

export default PropertyList;

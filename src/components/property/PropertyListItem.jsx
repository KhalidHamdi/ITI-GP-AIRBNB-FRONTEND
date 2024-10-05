import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { openEditPropertyModal, openAddAdsModal } from "../../redux/modalSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import Cookies from "js-cookie";
import ConfirmationModal from "../ConfirmationModal";

const useFavorites = (propertyId) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    const token = Cookies.get("authToken");
    if (!token) return;

    try {
      const response = await axiosInstance.get("/api/favorite/");
      const favorites = response.data;
      const favStatus = favorites.some((fav) => fav.property.id === propertyId);
      setIsFavorite(favStatus);
    } catch (error) {
      console.error("Error checking favorite status", error);
    }
  }, [propertyId]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const toggleFavorite = async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      alert("Please log in to toggle favorite.");
      return;
    }

    setLoading(true);
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const url = isFavorite
        ? `/api/favorite/remove/${propertyId}/`
        : `/api/favorite/add/${propertyId}/`;
      await axiosInstance({ method, url });
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error toggling favorite", error);
      alert("An error occurred while toggling favorite.");
    } finally {
      setLoading(false);
    }
  };

  return { isFavorite, loading, toggleFavorite };
};

const PropertyListItem = ({ property, isLandlordPage, onDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFavorite, loading, toggleFavorite } = useFavorites(property.id);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const landlordId = property.landlord;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCardClick = () => {
    navigate(`/properties/${property.id}/`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    dispatch(openEditPropertyModal(property));
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handlePromoteClick = (e) => {
    e.stopPropagation();
    dispatch(openAddAdsModal(property));
    console.log("promote clicked!");
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    try {
      const response = await axiosInstance.delete(
        `/api/properties/${property.id}/delete/`
      );
      if (response.status === 204) {
        // No Content
        alert("Property deleted successfully.");
        if (onDelete) onDelete(property.id);
      } else {
        alert("Failed to delete the property. Please try again.");
      }
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("An error occurred while deleting the property.");
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (property.images.length > 0) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % property.images.length
      );
    }
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (property.images.length > 0) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + property.images.length) % property.images.length
      );
    }
  };

  const imageUrl =
    property.images.length > 0
      ? property.images[currentImageIndex]?.image
      : null;

  return (
    <>
      <div
        className="card h-100 border-0 shadow-sm"
        onClick={handleCardClick}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <div
          className="position-relative"
          style={{
            overflow: "hidden",
          }}
        >
          {/* Conditional Ribbon for Advertised Properties */}
          {property.is_advertised && (

            <div
              className="advertised-ribbon"
              style={{
                position: "absolute",
                top: "25px",
                left: "-30px" /* Adjust this based on your card size */,
                backgroundColor: "green" /* Color for the ribbon */,
                color: "white",
                padding:
                  "5px 40px" /* Adjust the padding to fit the ribbon properly */,
                fontSize: "12px" /* Adjust based on your preference */,
                fontWeight: "bold",
                transform: "rotate(-45deg)",
                zIndex: "0",
                boxShadow: "15px 0px 20px rgba(0, 0, 0, 0.9)",
              }}
            >
              Advertised
            </div>
          )}
          <img
            src={imageUrl || "path/to/placeholder-image.jpg"}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="card-img-top"
            style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
          />
          {property.images.length > 1 && (
            <>
              <button
                className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y"
                onClick={handlePrevImage}
                style={{ left: "10px" }}
              >
                &lt;
              </button>
              <button
                className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y"
                onClick={handleNextImage}
                style={{ right: "10px" }}
              >
                &gt;
              </button>
            </>
          )}
          <button
            className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite();
            }}
            disabled={loading}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i
                className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}
              ></i>
            )}
          </button>
        </div>

        <div className="card-body p-3">
          <h5 className="card-title mb-1">{property.title}</h5>
          <p className="card-text text-muted small mb-2">{property.location}</p>
          <p className="card-text">
            <strong>${property.price_per_night}</strong>{" "}
            <span className="text-muted">/ night</span>
          </p>
        </div>

        {isLandlordPage && landlordId === userId && (
          <div className="card-footer d-flex flex-column align-items-start p-2">
            <button
              className="btn btn-outline-secondary mb-1 rounded-pill"
              onClick={handleEditClick}
              aria-label="Edit Property"
              style={{
                padding: "0px 12px",
                width: "100%",
                height: "25px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger btn-block mb-1 rounded-pill"
              onClick={handleDeleteClick}
              aria-label="Delete Property"
              style={{
                padding: "0px 12px",
                width: "100%",
                height: "25px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-outline-primary btn-block rounded-pill"
              onClick={handlePromoteClick}
              style={{
                padding: "0px 12px",
                width: "100%",
                height: "25px",
                fontSize: "14px",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              }}
            >
              Promote
            </button>
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete this property? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </>
  );
};

export default PropertyListItem;

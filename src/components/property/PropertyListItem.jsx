// PropertyListItem.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { openEditPropertyModal } from '../../redux/modalSlice';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../axios";
import Cookies from "js-cookie";

const useFavorites = (propertyId) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkFavoriteStatus = useCallback(async () => {
        const token = Cookies.get('authToken');
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
        const token = Cookies.get('authToken');
        if (!token) {
            alert("Please log in to toggle favorite.");
            return;
        }

        setLoading(true);
        try {
            const method = isFavorite ? 'DELETE' : 'POST';
            const url = isFavorite ? `/api/favorite/remove/${propertyId}/` : `/api/favorite/add/${propertyId}/`;
            await axiosInstance({ method, url });
            setIsFavorite((prev) => !prev);
        } catch (error) {
            console.error("Error toggling favorite", error);
        } finally {
            setLoading(false);
        }
    };

    return { isFavorite, loading, toggleFavorite };
};

const PropertyListItem = ({ property, isLandlordPage }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFavorite, loading, toggleFavorite } = useFavorites(property.id);

    const handleCardClick = () => {
        navigate(`/properties/${property.id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        dispatch(openEditPropertyModal(property));
    };

    return (
        <div className="card h-100 border-0 shadow-sm" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="position-relative">
                <img
                    src={property.image_url}
                    alt={property.title}
                    className="card-img-top"
                    style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
                <button
                    className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite();
                    }}
                    disabled={loading}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
                    )}
                </button>
                {isLandlordPage && (
                    <button
                        className="btn btn-secondary btn-sm position-absolute top-0 start-0 m-2 rounded-pill"
                        onClick={handleEditClick}
                        aria-label="Edit Property"
                    >
                        Edit
                    </button>
                )}
            </div>
            <div className="card-body p-3">
                <h5 className="card-title mb-1">{property.title}</h5>
                <p className="card-text text-muted small mb-2">{property.location}</p>
                <p className="card-text">
                    <strong>${property.price_per_night}</strong> <span className="text-muted">/ night</span>
                </p>
            </div>
        </div>
    );
};

export default PropertyListItem;

import React from "react";
import { useNavigate } from 'react-router-dom';

const PropertyListItem = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div
        className="position-relative"
        onClick={() => navigate(`/properties/${property.id}`)} 
      >
        <img
          src={property.image_url}
          alt={property.title}
          className="card-img-top"
          style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
        />
        <button className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle">
          <i className="bi bi-heart"></i>
        </button>
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

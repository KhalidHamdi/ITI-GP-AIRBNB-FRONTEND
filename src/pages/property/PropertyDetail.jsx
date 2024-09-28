// PropertyDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Cookies from 'js-cookie';
import ReservationSidebar from "../../components/Reservations/ReservationSidebar";
import ReviewForm from "../../components/reviews/ReviewForm";
import ReviewList from "../../components/reviews/ReviewList";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [position, setPosition] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/properties/${id}/`);
        setProperty(response.data);
        setLoading(false);

        const address = `${response.data.address}, ${response.data.city}, ${response.data.country}`;
        
        // Use the backend proxy endpoint for geocode
        const openCageResponse = await axiosInstance.get(
          `/api/properties/geocode/`,
          {
            params: { q: address },
            // No need to include API key here
          }
        );
        if (openCageResponse.data && openCageResponse.data.results.length > 0) {
          const coordinates = openCageResponse.data.results[0].geometry;
          setPosition([coordinates.lat, coordinates.lng]);
        } else {
          setError("Geocode data not found.");
        }
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
        setError(error.response?.data?.error || "Unknown error.");
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axiosInstance.get(`/api/properties/${id}/reviews/`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const checkAuthStatus = () => {
      const accessToken = Cookies.get('accessToken');
      const userId = localStorage.getItem('userId');
      if (accessToken && userId) {
        setIsAuthenticated(true);
        setCurrentUser({ id: userId });
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    fetchData();
    fetchReviews();
    checkAuthStatus();
  }, [id]);

  useEffect(() => {
    if (currentUser && reviews.length > 0) {
      const userReview = reviews.find(review => review.user.toString() === currentUser.id);
      setHasReviewed(!!userReview);
    }
  }, [currentUser, reviews]);

  const handleReviewAdded = (newReview) => {
    setReviews([...reviews, newReview]);
    setHasReviewed(true);
  };

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  if (!property)
    return <div className="text-center mt-5">Property not found</div>;

  return (
    <div className="container mt-4" style={{ maxWidth: "1100px" }}>
      <div className="row">
        <div className="col-12">
          <h1 className="mb-3 fw-bold" style={{ fontSize: "26px" }}>
            {property.title}
          </h1>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="me-2">
                <i className="bi bi-star-fill" style={{ color: "#FF385C" }}></i>{" "}
                {property.average_rating || "No rating"}
              </span>
              <span className="me-2">·</span>
              <span className="text-decoration-underline me-2 fw-semibold">
                {property.reviews_count || "No reviews"}
              </span>
              <span className="me-2">·</span>
              <span className="text-decoration-underline fw-semibold">
                {property.city}, {property.country}
              </span>
            </div>
            <div>
              <button className="btn btn-link text-dark me-2">
                <i className="bi bi-upload me-2"></i>Share
              </button>
              <button className="btn btn-link text-dark">
                <i className="bi bi-heart me-2"></i>Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div
            style={{
              height: "400px",
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <img
              src={property.image_url}
              alt={property.title}
              className="img-fluid w-100 h-100"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
            <div>
              <h2 style={{ fontSize: "22px" }} className="fw-bold mb-2">
                Entire rental unit hosted by Host Name
              </h2>
              <p className="mb-0 text-muted">
                {property.guests} guests · {property.bedrooms} bedroom
                {property.bedrooms > 1 ? "s" : ""} · {property.bathrooms}{" "}
                bathroom{property.bathrooms > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">Property Description</h3>
            <p style={{ whiteSpace: "pre-line" }}>{property.description}</p>
            <br />
          </div>
        </div>
        <ReservationSidebar property={property} userId={id} />
      </div>

      <hr className="my-5" />

      <ReviewList reviews={reviews} />

      <hr className="my-5" />

      {isAuthenticated ? (
        hasReviewed ? (
          <p>Thank you for your review!</p>
        ) : (
          <ReviewForm 
            propertyId={id} 
            onReviewAdded={handleReviewAdded} 
            axiosInstance={axiosInstance}
          />
        )
      ) : (
        <p>Please log in to submit a review.</p>
      )}

      <hr className="my-5" />

      <div className="row mb-5">
        <div className="col-12">
          <h3 className="fs-4 fw-bold mb-4">Where you'll be</h3>
          <p>{property.address}, {property.city}, {property.country}</p>
          {position ? (
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "480px", borderRadius: "12px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>
                  {property.title} <br /> {property.city}, {property.country}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>

      <hr className="my-5" />

      <div className="row mb-5">
        <div className="col-12">
          <h3 className="fs-4 fw-bold mb-4">Things to know</h3>
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fs-5 fw-bold">House rules</h5>
              <p className="mb-2">
                <i className="bi bi-clock me-2"></i>Check-in after 3:00 PM
              </p>
              <p className="mb-2">
                <i className="bi bi-clock-history me-2"></i>Check-out before
                11:00 AM
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fs-5 fw-bold">Safety & Property</h5>
              <p className="mb-2">
                <i className="bi bi-alarm me-2"></i>Smoke alarm
              </p>
              <p className="mb-2">
                <i className="bi bi-door-closed me-2"></i>Carbon monoxide alarm
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fs-5 fw-bold">Cancellation policy</h5>
              <p className="mb-2">Free cancellation for 48 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationSidebar from "../../components/Reservations/ReservationSidebar";
import ReviewForm from "../../components/reviews/ReviewForm";
import ReviewList from "../../components/reviews/ReviewList";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axios.get(`http://localhost:8000/api/properties/${id}/reviews/`);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
    fetchReviews();
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setReviews([...reviews, newReview]);
  };

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
                4.9
              </span>
              <span className="me-2">·</span>
              <span className="text-decoration-underline me-2 fw-semibold">
                290 reviews
              </span>
              <span className="me-2">·</span>
              <span className="text-decoration-underline fw-semibold">
                {property.country}
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
            <div>
              {/* <img src="" alt="Host" className="rounded-circle" width="56" height="56" /> " lesa hanzowdha*/}
            </div>
          </div>
          <div className="py-4 border-bottom">
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-award fs-3 me-3"></i>
              <div>
                <h3 className="fs-5 fw-bold mb-1">Host Name is a Superhost</h3>
                <p className="mb-0 text-muted">
                  Superhosts are experienced, highly rated hosts who are
                  committed to providing great stays for guests.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4">
              <i className="bi bi-key fs-3 me-3"></i>
              <div>
                <h3 className="fs-5 fw-bold mb-1">Great check-in experience</h3>
                <p className="mb-0 text-muted">
                  100% of recent guests gave the check-in process a 5-star
                  rating.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-check fs-3 me-3"></i>
              <div>
                <h3 className="fs-5 fw-bold mb-1">
                  Free cancellation for 48 hours
                </h3>
              </div>
            </div>
          </div>
          <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">Property Description</h3>
            <p style={{ whiteSpace: "pre-line" }}>{property.description}</p>
            <br />
          </div>
          <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">What this place offers</h3>
            <div className="row">
              <div className="col-6">
                <p>
                  <i className="bi bi-wifi me-3"></i>Wifi
                </p>
                <p>
                  <i className="bi bi-tv me-3"></i>TV
                </p>
              </div>
              <div className="col-6">
                <p>
                  <i className="bi bi-snow me-3"></i>Air conditioning
                </p>
                <p>
                  <i className="bi bi-laptop me-3"></i>Workspace
                </p>
              </div>
            </div>
            <button className="btn btn-outline-dark mt-3">
              Show all amenities
            </button>
          </div>
        </div>
        <ReservationSidebar property={property} userId={id} />
      </div>

      <hr className="my-5" />

      <ReviewList reviews={reviews} />


      <hr className="my-5" />



      <div className="row mb-5">
        <div className="col-12">
          <h3 className="fs-4 fw-bold mb-4">Where you'll be</h3>
          <p>{property.country}</p>
          <div
            style={{
              height: "480px",
              background: "#eee",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Map placeholder
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <ReviewForm propertyId={id} onReviewAdded={handleReviewAdded} />

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
                <i className="bi bi-clock-history me-2"></i>Checkout before
                11:00 AM
              </p>
              <p className="mb-2">
                <i className="bi bi-person me-2"></i>
                {property.guests} guests maximum
              </p>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <h5 className="fs-5 fw-bold">Safety & property</h5>
              <p className="mb-2">
                <i className="bi bi-exclamation-triangle me-2"></i>Carbon
                monoxide alarm
              </p>
              <p className="mb-2">
                <i className="bi bi-fire me-2"></i>Smoke alarm
              </p>
            </div>
            <div className="col-md-4">
              <h5 className="fs-5 fw-bold">Cancellation policy</h5>
              <p className="mb-2">Free cancellation for 48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
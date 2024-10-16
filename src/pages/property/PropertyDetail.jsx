import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../axios";
import Cookies from "js-cookie";
import ReservationSidebar from "../../components/Reservations/ReservationSidebar";
import ReviewForm from "../../components/reviews/ReviewForm";
import ReviewList from "../../components/reviews/ReviewList";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ContactButton from "../../components/ContactButton";
import "./PropertyDetail.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openLoginModal } from "../../redux/modalSlice";
import PropertyImageModal from '../../components/modals/PropertyImageModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [position, setPosition] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [userId, setUserId] = useState(null);
  const [landlordId, setLandlordId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await axiosInstance.get(`/api/properties/${id}/`);
        setProperty(response.data);
        setLandlordId(response.data.landlord.id);

        const currentUserId = localStorage.getItem("userId");
        if (currentUserId) {
          setUserId(currentUserId);
        }

        const address = `${response.data.address}, ${response.data.city}, ${response.data.country}`;
        const openCageResponse = await axiosInstance.get(
          `/api/properties/geocode/`,
          {
            params: { q: address },
          }
        );

        if (openCageResponse.data && openCageResponse.data.results.length > 0) {
          const coordinates = openCageResponse.data.results[0].geometry;
          setPosition([coordinates.lat, coordinates.lng]);
        } else {
          console.error("Geocode data not found.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const reviewsResponse = await axiosInstance.get(
          `/api/properties/${id}/reviews/`
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const checkAuthStatus = () => {
      const accessToken = Cookies.get("authToken");
      const userId = localStorage.getItem("userId");
      if (accessToken && userId) {
        setIsAuthenticated(true);
        setCurrentUser({ id: userId });
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    fetchPropertyData();
    fetchReviews();
    checkAuthStatus();
  }, [id]);

  useEffect(() => {
    if (currentUser && reviews.length > 0) {
      const userReview = reviews.find(
        (review) =>
          review.user && review.user.id.toString() === currentUser.id.toString()
      );
      setHasReviewed(!!userReview);
    }
  }, [currentUser, reviews]);

  const handleReviewAdded = (newReview) => {
    setReviews([newReview, ...reviews]);
    setHasReviewed(true);
  };

  const toggleFavorite = async () => {
    const token = Cookies.get("authToken");
    if (!token) return;

    try {
      if (isFavorite) {
        await axiosInstance.delete(`/api/favorite/${property.id}/`);
      } else {
        await axiosInstance.post(`/api/favorite/`, {
          property_id: property.id,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const closeModal = () => {
    setShowAllPhotos(false);
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = Cookies.get("authToken");
      if (!token) return;

      try {
        const response = await axiosInstance.get("/api/favorite/");
        const favorites = response.data;
        const favStatus = favorites.some(
          (fav) => fav.property.id === property.id
        );
        setIsFavorite(favStatus);
      } catch (error) {
        console.error("Error checking favorite status", error);
      }
    };

    if (property) {
      checkFavoriteStatus();
    }
  }, [property]);

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;


  const handleShare = () => {
    const shareData = {
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Property shared successfully"))
        .catch((error) => console.error("Error sharing property:", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch((error) =>
          console.error("Error copying link to clipboard:", error)
        );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!property)
    return <div className="text-center mt-5">Property not found</div>;

  const amenities = [
    { icon: "wifi", name: "Wifi" },
    { icon: "tv", name: "TV" },
    { icon: "thermometer-half", name: "Heating" },
    { icon: "snow", name: "Air conditioning" },
    { icon: "utensils", name: "Kitchen" },
    { icon: "car", name: "Free parking" },
  ];

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return "No ratings yet";
    const sum = reviews.reduce((acc, review) => {
      const rating = parseFloat(review.rating);
      return isNaN(rating) ? acc : acc + rating;
    }, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const calculateCategoryAverage = (reviews, category) => {
    if (reviews.length === 0) return "N/A";
    const validReviews = reviews.filter(review => !isNaN(parseFloat(review[category])));
    if (validReviews.length === 0) return "N/A";
    const sum = validReviews.reduce((acc, review) => acc + parseFloat(review[category]), 0);
    return (sum / validReviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);
  return (
    <div
      className={`container mt-4 ${darkMode ? "dark-mode" : ""}`}
      style={{ maxWidth: "1100px" }}
    >
      <div className="row">
        <div className="col-12">
          <h1 className="mb-3 fw-bold" style={{ fontSize: "26px" }}>
            {property.title}
          </h1>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="me-2">
                <i className="bi bi-star-fill" style={{ color: "#FF385C" }}></i>{" "}
                {averageRating || "No rating"}
              </span>
              <span className="text-decoration-underline me-2 fw-semibold">
                {property.reviews_count || "No"} Reviews
              </span>
              <span className="text-decoration-underline fw-semibold">
                {property.city}, {property.country}
              </span>
            </div>
            <div>
              <button className="btn btn-link text-dark me-2" onClick={handleShare}>
                <i className="bi bi-upload me-2"></i>Share
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="row mt-4">
        <div className="col-12">
          {property?.images && property.images.length > 0 ? (
            <div className="position-relative">
              <img
                src={property.images[0].image}
                alt={property.title}
                className="img-fluid w-100"
                style={{ borderRadius: '12px', objectFit: 'cover', height: '400px' }}
              />
              <button
                className="btn btn-light position-absolute bottom-0 end-0 m-3"
                onClick={() => setShowImageModal(true)}
              >
                Show All Images
              </button>
            </div>
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>

      <PropertyImageModal
        images={property?.images || []}
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
      />

      <div className="row mt-4">
        <div className="col-lg-7">
          <div className="d-flex justify-content-between align-items-center pb-4 border-bottom">
            <div>
              <Link
                to={`/landlord/${property.landlord.id}`}
                className="text-decoration-none"
              >
                <h3 className="fs-5 fw-bold mb-1">
                  {property.landlord.username}, Hosted this property
                </h3>
              </Link>
              <p className="mb-0 text-muted">
                {property.guests} guests  {property.bedrooms} bedroom
                {property.bedrooms > 1 ? "s" : ""}  {property.bathrooms}{" "}
                bathroom{property.bathrooms > 1 ? "s" : ""}
              </p>
              {property.is_advertised && (
                <button type="button" class="btn btn-success disabled mt-3">
                  Advertised
                </button>
              )}
            </div>
            <img
              src={
                property.landlord.avatar ||
                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
              }
              alt="Host"
              className="rounded-circle"
              style={{ width: "64px", height: "64px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg";
              }}
            />
          </div>

          <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">About this space</h3>
            <p style={{ whiteSpace: "pre-line" }}>{property.description}</p>
          </div>

          {/* <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">Where you'll sleep</h3>
            <div className="d-flex overflow-auto">
              {[...Array(property.bedrooms)].map((_, index) => (
                <div
                  key={index}
                  className="me-3 p-3 border rounded"
                  style={{ minWidth: "200px" }}
                >
                  <i className="bi bi-door-closed fs-4 mb-2"></i>
                  <h4 className="fs-5 mb-1">Bedroom {index + 1}</h4>
                  <p className="mb-0">1 queen bed</p>
                </div>
              ))}
            </div>
          </div> */}

          <div className="py-4 border-bottom">
            <h3 className="fs-4 fw-bold mb-4">What this place offers</h3>
            <div className="row">
              {amenities.map((amenity, index) => (
                <div key={index} className="col-6 mb-3">
                  <i className={`bi bi-${amenity.icon} me-2`}></i>
                  {amenity.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <ReservationSidebar
          property={property}
          userId={id}
          darkMode={darkMode}
        />
      </div>

      
      <div className="mt-5">
  <h3 className="fs-4 fw-bold mb-4">
    <i className="bi bi-star-fill me-2" style={{ color: "#FF385C" }}></i>
    {averageRating} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
  </h3>

  <div className="row mb-4">
    <div className="col-md-6">
      {[
        { category: 'cleanliness', icon: 'bi bi-brush' },
        { category: 'accuracy', icon: 'bi bi-check-circle' },
        { category: 'communication', icon: 'bi bi-chat' }
      ].map(({ category, icon }) => (
        <div key={category} className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <i className={`${icon} me-2`} style={{ fontSize: '1.5rem' }}></i>
            <span className="text-capitalize">{category}</span>
          </div>
          <div className="d-flex align-items-center" style={{ width: "60%" }}>
            <div className="progress w-100 me-2">
              <div
                className="progress-bar bg-dark"
                style={{
                  width: `${(parseFloat(calculateCategoryAverage(reviews, category)) / 5) * 100}%`,
                }}
              ></div>
            </div>
            <span>{calculateCategoryAverage(reviews, category)}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="col-md-6">
      {[
        { category: 'location', icon: 'bi bi-geo-alt' },
        { category: 'check_in', icon: 'bi bi-key' },
        { category: 'value', icon: 'bi bi-tag' }
      ].map(({ category, icon }) => (
        <div key={category} className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            <i className={`${icon} me-2`} style={{ fontSize: '1.5rem' }}></i>
            <span className="text-capitalize">{category.replace('_', '-')}</span>
          </div>
          <div className="d-flex align-items-center" style={{ width: "60%" }}>
            <div className="progress w-100 me-2">
              <div
                className="progress-bar bg-dark"
                style={{
                  width: `${(parseFloat(calculateCategoryAverage(reviews, category)) / 5) * 100}%`,
                }}
              ></div>
            </div>
            <span>{calculateCategoryAverage(reviews, category)}</span>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-4 border-top pt-3">
  {/* Review List */}
  <ReviewList reviews={reviews.slice(0, 6)} />
</div>
</div>
<div
  className={`mt-5 ${
    !hasReviewed && isAuthenticated && userId !== landlordId ? 'border-top pt-5' : ''
  }`}
>
  {isAuthenticated && userId !== landlordId ? (
    !hasReviewed && ( 
      <>
        <h3 className="fs-4 fw-bold mb-4">Add a review</h3>
        <ReviewForm propertyId={id} onReviewAdded={handleReviewAdded} />
      </>
    )
  ) : !isAuthenticated ? (
    <p>
      Please{" "}
      <button
        type="button"
        className="btn btn-link"
        onClick={() => dispatch(openLoginModal())}
      >
        Login
      </button>{" "}
      to submit a review.
    </p>
  ) : null}
  <ToastContainer />
</div>

<div className="mt-4 border-top pt-3">
      <div className="mt-3">
        <h3 className="fs-4 fw-bold mb-4">Where you'll be</h3>
        <p>
          {property.address}, {property.city}, {property.country}
        </p>
        {position ? (
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "480px", borderRadius: "12px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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

      <div className="mt-5 border-top pt-5">
        <div className="d-flex align-items-center mb-4">
          <img
            src={
              property.landlord.avatar ||
              "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            }
            alt="Host"
            className="rounded-circle me-3"
            style={{ width: "64px", height: "64px" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg";
            }}
          />
          <div>
            <h3 className="fs-4 fw-bold mb-1">
              Hosted by {property.landlord.username}
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p>
              <i className="bi bi-shield-check me-2"></i> Identity verified
            </p>
            <p>
              <i className="bi bi-award me-2"></i> Superhost
            </p>
          </div>
          <div className="col-md-6">
            <p>Response rate: 100%</p>
            <p>Response time: within an hour</p>
          </div>
        </div>
        <p className="mt-3">
          Hi, I'm {property.landlord.username}! I love hosting and meeting
          people from all over the world. I'm passionate about travel, food, and
          creating memorable experiences for my guests.
        </p>
        {isAuthenticated ? (
          userId !== landlordId ? (
            <ContactButton userId={userId} landlordId={landlordId} />
          ) : null
        ) : (
          <button className="btn btn-primary" type="button" onClick={() => dispatch(openLoginModal())}>
            Please login so you can contact the Host
          </button>
        )}
      </div>

      <div className="mt-5 border-top pt-5">
        <h3 className="fs-4 fw-bold mb-4">Things to know</h3>
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="fs-6 fw-bold mb-3">House rules</h4>
            <ul className="list-unstyled">
              {property.house_rules &&
                property.house_rules.map((rule, index) => (
                  <li key={index}>
                    <i className="bi bi-check2 me-2"></i>
                    {rule}
                  </li>
                ))}
              <li>
                <i className="bi bi-check2 me-2"></i>Check-in: After 3:00 PM
              </li>
              <li>
                <i className="bi bi-check2 me-2"></i>Checkout: 11:00 AM
              </li>
              <li>
                <i className="bi bi-check2 me-2"></i>No smoking
              </li>
              <li>
                <i className="bi bi-check2 me-2"></i>No pets
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h4 className="fs-6 fw-bold mb-3">Safety & Property</h4>
            <ul className="list-unstyled">
              {property.safety &&
                property.safety.map((safetyItem, index) => (
                  <li key={index}>
                    <i className="bi bi-shield-check me-2"></i>
                    {safetyItem}
                  </li>
                ))}
              <li>
                <i className="bi bi-shield-check me-2"></i>Carbon monoxide alarm
              </li>
              <li>
                <i className="bi bi-shield-check me-2"></i>Smoke alarm
              </li>
              <li>
                <i className="bi bi-shield-check me-2"></i>Security
                camera/recording device
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="fs-6 fw-bold mb-3">Cancellation Policy</h4>
            <ul className="list-unstyled">
              {property.cancellation &&
                property.cancellation.map((policyItem, index) => (
                  <li key={index}>
                    <i className="bi bi-info-circle me-2"></i>
                    {policyItem}
                  </li>
                ))}
              <li>
                <i className="bi bi-info-circle me-2"></i>Free cancellation for
                24 hours
              </li>
              <li>
                <i className="bi bi-info-circle me-2"></i>Review the host's full
                cancellation policy which applies even if you cancel for illness
                or disruptions caused by COVID-19.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 border-top pt-5">
        <h3 className="fs-4 fw-bold mb-4">Support</h3>
        <p>
          If you need any assistance during your stay, please don't hesitate to
          contact us. We're here to help ensure you have a great experience!
        </p>
        <div className="border p-4 rounded">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/contact-support")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
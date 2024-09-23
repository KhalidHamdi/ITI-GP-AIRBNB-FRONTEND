import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReservationSidebar from "../../components/Reservations/ReservationSidebar";

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/properties/${id}`
        );
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        <div className="col-lg-5">
          <div
            className="card shadow-sm sticky-top"
            style={{ top: "20px", borderRadius: "12px" }}
          >
            <div className="card-body">
              <h4 className="card-title mb-4">
                <span className="fw-bold" style={{ fontSize: "22px" }}>
                  ${property.price_per_night}
                </span>
                <small className="text-muted fw-normal"> night</small>
              </h4>
              <form>
                <div className="border rounded mb-3">
                  <div className="row g-0">
                    <div className="col-6 p-2 border-end">
                      <label
                        htmlFor="checkIn"
                        className="form-label small fw-bold"
                      >
                        CHECK-IN
                      </label>
                      <input
                        type="date"
                        className="form-control border-0 p-0"
                        id="checkIn"
                      />
                    </div>
                    <div className="col-6 p-2">
                      <label
                        htmlFor="checkOut"
                        className="form-label small fw-bold"
                      >
                        CHECKOUT
                      </label>
                      <input
                        type="date"
                        className="form-control border-0 p-0"
                        id="checkOut"
                      />
                    </div>
                  </div>
                  <div className="border-top p-2">
                    <label
                      htmlFor="guests"
                      className="form-label small fw-bold"
                    >
                      GUESTS
                    </label>
                    <select className="form-select border-0 p-0" id="guests">
                      {[...Array(property.guests)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} guest{i !== 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
                >
                  Reserve
                </button>
                <p className="text-center mb-4">You won't be charged yet</p>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-decoration-underline">
                    ${property.price_per_night} x 5 nights
                  </span>
                  <span>${property.price_per_night * 5}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-decoration-underline">
                    Cleaning fee
                  </span>
                  <span>$60</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-decoration-underline">Service fee</span>
                  <span>$40</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total before taxes</span>
                  <span>${property.price_per_night * 5 + 100}</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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

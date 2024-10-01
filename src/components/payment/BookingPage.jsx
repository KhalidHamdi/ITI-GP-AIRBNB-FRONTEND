import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axios";

const BookingPage = () => {
  const location = useLocation();
  const { totalPrice, reservationId, guests } = location.state || {
    totalPrice: 0,
    reservationId: null,
    guests: 1,
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To handle button disable and loading states

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone number is invalid (should be 10-15 digits)";
    }

    return newErrors;
  };

  const handlePay = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        // Step 1: Save form data
        await axiosInstance.post(
          `api/payments/reservation/${reservationId}/update-details/`,
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
          }
        );

        // Step 2: Initiate payment and get iframe URL
        const response = await axiosInstance.post(
          `api/payments/reservation/${reservationId}/initiate-payment/`
        );
        const iframeUrl = response.data.iframe_url;

        // Step 3: Redirect to Paymob iframe
        window.location.href = iframeUrl;
      } catch (error) {
        console.error("Error processing payment:", error);
        // Handle the error if needed
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axiosInstance.get(`/api/payments/redirect/`);
        console.log("Payment response", response);
        if (response.data.success && response.data.redirect_url) {
          window.location.href = response.data.redirect_url;
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    // Poll the payment status every few seconds
    const intervalId = setInterval(checkPaymentStatus, 5000);

    return () => clearInterval(intervalId); // Clean up the interval when the component is unmounted
  }, []);

  return (
    <div className="container mt-4 mb-4">
      <div className="row">
        {/* Side Box: Booking Details */}
        <div className="col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Your Booking Details</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Guests</span>
                <span>{guests}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span>
                <span>${totalPrice || "0"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">Enter Your Details</h5>

              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                  style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "PAY"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

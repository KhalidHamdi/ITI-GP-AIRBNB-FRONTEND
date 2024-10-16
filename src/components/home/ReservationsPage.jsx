import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axios";
import "./ReservationsPage.css";

const MyReservationsPage = () => {
  const [paidReservations, setPaidReservations] = useState([]);
  const [unpaidReservations, setUnpaidReservations] = useState([]);
  const [imageIndices, setImageIndices] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/myreservations/");
        setPaidReservations(response.data.paid_reservations);
        setUnpaidReservations(response.data.unpaid_reservations);

        const initialIndices = {};
        response.data.paid_reservations.forEach(reservation => {
          initialIndices[reservation.id] = 0; 
        });
        response.data.unpaid_reservations.forEach(reservation => {
          initialIndices[reservation.id] = 0; 
        });
        setImageIndices(initialIndices);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchReservations();
  }, []);

  const deleteReservation = async (reservationId) => {
    try {
      await axiosInstance.delete(`/api/property/reservations/${reservationId}/cancel/`);

      toast.success('Reservation cancelled successfully!', {
        position: "top-right",
        autoClose: 5000,
      });

      setPaidReservations(paidReservations.filter(reservation => reservation.id !== reservationId));
      setUnpaidReservations(unpaidReservations.filter(reservation => reservation.id !== reservationId));
      setImageIndices((prevIndices) => {
        const updatedIndices = { ...prevIndices };
        delete updatedIndices[reservationId];
        return updatedIndices;
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred while cancelling the reservation.';

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handlePaymentClick = (reservation) => {
    const { total_price: totalPrice, guests, id: reservationId } = reservation;

    navigate("/payment", {
      state: { totalPrice, guests, reservationId },
    });
  };

  const handleNextImage = (reservationId, imagesLength) => {
    setImageIndices((prevIndices) => {
      const currentIndex = (prevIndices[reservationId] + 1) % imagesLength;
      return { ...prevIndices, [reservationId]: currentIndex };
    });
  };

  const handlePrevImage = (reservationId, imagesLength) => {
    setImageIndices((prevIndices) => {
      const currentIndex = (prevIndices[reservationId] - 1 + imagesLength) % imagesLength;
      return { ...prevIndices, [reservationId]: currentIndex };
    });
  };

  if (loading) {
    return (
      <div className="loading-container text-center py-5">
        <h2>Loading your reservations...</h2>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="container py-4">
      <ToastContainer />
      <h1 className="mb-4 h3">My Reservations</h1>

      {unpaidReservations.length > 0 && (
        <>
          <section>
            <h2 className="mb-4 h4">Unpaid Reservations</h2>
            <div className="row gy-4">
              {unpaidReservations.map((reservation) => (
                <div key={reservation.id} className="col-12">
                  <div className="card shadow-sm border-0 rounded-lg">
                    <div className="row g-0">
                      <div className="col-md-3">
                        <div className="position-relative">
                          <img
                            src={reservation.property.images[imageIndices[reservation.id]]?.image || "path/to/placeholder-image.jpg"}
                            className="img-fluid hover-zoom"
                            alt={reservation.property.title}
                          />
                          {reservation.property.images.length > 1 && (
                            <>
                              <button
                                className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y"
                                onClick={() => handlePrevImage(reservation.id, reservation.property.images.length)}
                                style={{ left: "10px" }}
                              >
                                &lt;
                              </button>
                              <button
                                className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y"
                                onClick={() => handleNextImage(reservation.id, reservation.property.images.length)}
                                style={{ right: "10px" }}
                              >
                                &gt;
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <h5 className="card-title mb-3">{reservation.property.title}</h5>
                          <p className="mb-2"><strong>Check-in date:</strong> {reservation.start_date}</p>
                          <p className="mb-2"><strong>Check-out date:</strong> {reservation.end_date}</p>
                          <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>

                          <div className="d-flex justify-content-between align-items-center">
                            <Link to={`/properties/${reservation.property.id}`} className="btn btn-primary">Go to property</Link>
                            <button onClick={() => handlePaymentClick(reservation)} className="btn btn-primary ms-2">Go to Payment</button>
                            <button onClick={() => deleteReservation(reservation.id)} className="btn btn-primary ms-2">Cancel Reservation</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr />
        </>
      )}

      {paidReservations.length === 0 ? (
        <div className="no-reservations-message text-center py-5">
          <h2>You haven't booked any properties yet!</h2>
          <p className="mt-3">Your next adventure awaits! Explore our top-rated destinations and book a place you'll love. Don't miss out on creating unforgettable memories.</p>
          <Link to="/" className="btn btn-primary mt-4">Discover Properties</Link>
        </div>
      ) : (
        <section className="mt-5">
          <h2 className="mb-4 h4">Paid Reservations</h2>
          <div className="row gy-4">
            {paidReservations.map((reservation) => (
              <div key={reservation.id} className="col-12">
                <div className="card shadow-sm border-0 rounded-lg">
                  <div className="row g-0">
                    <div className="col-md-3">
                      <div className="position-relative">
                        <img
                          src={reservation.property.images[imageIndices[reservation.id]]?.image || "path/to/placeholder-image.jpg"}
                          className="img-fluid hover-zoom"
                          alt={reservation.property.title}
                        />
                        {reservation.property.images.length > 1 && (
                          <>
                            <button
                              className="btn btn-light btn-sm position-absolute top-50 start-0 translate-middle-y"
                              onClick={() => handlePrevImage(reservation.id, reservation.property.images.length)}
                              style={{ left: "10px" }}
                            >
                              &lt;
                            </button>
                            <button
                              className="btn btn-light btn-sm position-absolute top-50 end-0 translate-middle-y"
                              onClick={() => handleNextImage(reservation.id, reservation.property.images.length)}
                              style={{ right: "10px" }}
                            >
                              &gt;
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title mb-3">{reservation.property.title}</h5>
                        <p className="mb-2"><strong>Check-in date:</strong> {reservation.start_date}</p>
                        <p className="mb-2"><strong>Check-out date:</strong> {reservation.end_date}</p>
                        <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>

                        <div className="d-flex justify-content-between align-items-center">
                          <Link to={`/properties/${reservation.property.id}`} className="btn btn-primary">Go to property</Link>
                          <button onClick={() => deleteReservation(reservation.id)} className="btn btn-primary ms-2">Cancel Reservation</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default MyReservationsPage;

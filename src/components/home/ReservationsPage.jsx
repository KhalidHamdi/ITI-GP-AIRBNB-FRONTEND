import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../../axios";
import "./ReservationsPage.css";

const MyReservationsPage = () => {
  const [paidReservations, setPaidReservations] = useState([]);
  const [unpaidReservations, setUnpaidReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/myreservations/");
        setPaidReservations(response.data.paid_reservations);
        setUnpaidReservations(response.data.unpaid_reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
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
    } catch (error) {
      toast.error('An error occurred while cancelling the reservation.', {
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

  return (
    <main className="container py-4">
      <ToastContainer />
      <h1 className="mb-4 h3">My Reservations</h1>

      {/* Unpaid Reservations */}
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
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={reservation.property.image_url}
                            className="img-fluid hover-zoom"
                            alt={reservation.property.title}
                          />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="card-body">
                          <h5 className="card-title mb-3">
                            {reservation.property.title}
                          </h5>
                          <p className="mb-2">
                            <strong>Check-in date:</strong> {reservation.start_date}
                          </p>
                          <p className="mb-2">
                            <strong>Check-out date:</strong> {reservation.end_date}
                          </p>
                          <p className="mb-2">
                            <strong>Total price:</strong> ${reservation.total_price}
                          </p>

                          <div className="d-flex justify-content-between align-items-center">
                            <Link
                              to={`/properties/${reservation.property.id}`}
                              className="btn btn-primary"
                            >
                              Go to property
                            </Link>

                            <button
                              onClick={() => handlePaymentClick(reservation)}
                              className="btn btn-primary ms-2"
                            >
                              Go to Payment
                            </button>

                            <button
                              onClick={() => deleteReservation(reservation.id)}
                              className="btn btn-primary ms-2"
                            >
                              Cancel Reservation
                            </button>
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

      {/* Paid Reservations */}
      {paidReservations.length === 0 ? (
        <div className="no-reservations-message text-center py-5">
          <h2>You haven't booked any properties yet!</h2>
          <p className="mt-3">
            Your next adventure awaits! Explore our top-rated destinations and book a place you'll love. Don't miss out on creating unforgettable memories.
          </p>
          <Link to="/" className="btn btn-primary mt-4">
            Discover Properties
          </Link>
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
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src={reservation.property.image_url}
                          className="img-fluid hover-zoom"
                          alt={reservation.property.title}
                        />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="card-body">
                        <h5 className="card-title mb-3">
                          {reservation.property.title}
                        </h5>
                        <p className="mb-2">
                          <strong>Check-in date:</strong> {reservation.start_date}
                        </p>
                        <p className="mb-2">
                          <strong>Check-out date:</strong> {reservation.end_date}
                        </p>
                        <p className="mb-2">
                          <strong>Total price:</strong> ${reservation.total_price}
                        </p>

                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            to={`/properties/${reservation.property.id}`}
                            className="btn btn-primary"
                          >
                            Go to property
                          </Link>

                          <button
                            onClick={() => deleteReservation(reservation.id)}
                            className="btn btn-primary ms-2"
                          >
                            Cancel Reservation
                          </button>
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

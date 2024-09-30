import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css'; 
import axiosInstance from "../../axios"; 
import "./ReservationsPage.css"; 


const MyReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/myreservations/");
        setReservations(response.data); 
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);


  const deleteReservation = async (reservationId) => {
    try {
      const response = await axiosInstance.delete(`/api/property/reservations/${reservationId}/cancel/`);
  
      toast.success('Reservation cancelled successfully!', {
        position: "top-right", 
        autoClose: 5000,  
      });
  
      setReservations(reservations.filter(reservation => reservation.id !== reservationId));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || 'Cancellation failed. You can only cancel 7 days in advance.', {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error('An error occurred while cancelling the reservation.', {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };
  

  return (
    <main className="container py-4">
      <ToastContainer /> 
      <h1 className="mb-4 h3">My Reservations</h1>

      {reservations.length === 0 ? (
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
        <div className="row gy-4">
          {reservations.map((reservation) => (
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
                        <strong>Number of nights:</strong>{" "}
                        {reservation.number_of_nights}
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
      )}
    </main>
  );
};

export default MyReservationsPage;
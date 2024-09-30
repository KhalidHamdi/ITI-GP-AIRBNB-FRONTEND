import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import axiosInstance from "../../axios";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ReservationSidebar = ({ property, userId }) => {
  const [fee, setFee] = useState(0);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [minDate, setMinDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [guests, setGuests] = useState("1");
  // const [reservationId, setReservationId] = useState("1");
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  const navigate = useNavigate();

  const performBooking = async () => {
    if (userId) {
      if (dateRange.startDate && dateRange.endDate) {
        const formData = new FormData();
        formData.append("guests", guests);
        formData.append(
          "start_date",
          format(dateRange.startDate, "yyyy-MM-dd")
        );
        formData.append("end_date", format(dateRange.endDate, "yyyy-MM-dd"));
        formData.append("number_of_nights", nights.toString());
        formData.append("total_price", totalPrice.toString());

        try {
          const response = await axiosInstance.post(
            `/api/property/${property.id}/book/`,
            formData
          );
          if (response.data.success) {
            console.log("Booking successful");
            console.log("Reservation created:", response.data.reservation);
            let reservationId = response.data.reservation.id;
            // setReservationId(response.data.reservation.id);
            console.log(
              "Reservation Id from ReservationSideBar:",
              reservationId
            );

            navigate("/payment", {
              state: { totalPrice, guests, reservationId },
            });
          } else {
            console.log(response);
            console.log("Something went wrong...");
          }
        } catch (error) {
          console.log("UserId: ", userId);
          console.error("Error during booking:", error);
        }
      }
    } else {
      //TODO ya Basmala Handle login modal or notification here
      console.log("User needs to log in");
    }
  };
  // console.log("Reservation response", response);
  // console.log("Reservation created:", response.data.reservation);

  const _setDateRange = (selection) => {
    const newStartDate = new Date(selection.startDate);
    const newEndDate = new Date(selection.endDate);

    if (newEndDate <= newStartDate) {
      newEndDate.setDate(newStartDate.getDate() + 1);
    }

    setDateRange({
      ...dateRange,
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  const getReservations = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/property/${property.id}/reservations/`
      );
      let dates = [];
      response.data.forEach((reservation) => {
        const range = eachDayOfInterval({
          start: new Date(reservation.start_date),
          end: new Date(reservation.end_date),
        });
        dates = [...dates, ...range];
      });
      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  useEffect(() => {
    getReservations();

    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && property.price_per_night) {
        const _fee = ((dayCount * property.price_per_night) / 100) * 5;
        setFee(_fee);
        setTotalPrice(dayCount * property.price_per_night + _fee);
        setNights(dayCount);
      } else {
        const _fee = (property.price_per_night / 100) * 5;
        setFee(_fee);
        setTotalPrice(property.price_per_night + _fee);
        setNights(1);
      }
    }
  }, [dateRange]);

  return (
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
            <small className="text-muted fw-normal"> per night</small>
          </h4>

          <form>
            <div className="border rounded mb-3">
              <Calendar
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
              />

              <div className="border-top p-2">
                <label htmlFor="guests" className="form-label small fw-bold">
                  GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="form-select border-0 p-0"
                  id="guests"
                >
                  {guestsRange.map((number) => (
                    <option key={number} value={number}>
                      {number} guest{number > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={performBooking}
              className="btn btn-primary w-100 mb-3"
              style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
            >
              Book
            </button>
            <p className="text-center mb-4">You won't be charged yet</p>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-decoration-underline">
                ${property.price_per_night} x {nights} nights
              </span>
              <span>${property.price_per_night * nights}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-decoration-underline">Fee</span>
              <span>${fee}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationSidebar;

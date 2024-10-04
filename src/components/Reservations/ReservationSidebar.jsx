import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import axiosInstance from "../../axios";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";
import { toast } from "react-toastify";
import { openLoginModal } from "../../redux/modalSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles"; 

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const ReservationSidebar = ({ property, userId }) => {
  const theme = useTheme(); 
  const [fee, setFee] = useState(0);
  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [minDate, setMinDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [guests, setGuests] = useState("1");
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserId = localStorage.getItem("userId");

  const performBooking = async () => {
    if (loggedInUserId) {
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
            let reservationId = response.data.reservation.id;
            toast.info(
              "Your reservation has been placed, but it will not be confirmed until payment is received.",
              { position: "top-center", autoClose: 8000 }
            );

            setTimeout(() => {
              navigate("/payment", {
                state: { totalPrice, guests, reservationId },
              });
            }, 8000);
          } else {
            dispatch(openLoginModal());
            toast.error("You should Login first");
          }
        } catch (error) {
          console.error("Error during booking:", error);
        }
      }
    } else {
      dispatch(openLoginModal());
    }
  };

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
        style={{
          top: "20px",
          borderRadius: "12px",
          backgroundColor: theme.palette.background.default, 
          color: theme.palette.text.primary, 
        }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4">
            <span
              className="fw-bold"
              style={{
                fontSize: "22px",
                color: theme.palette.text.primary,
              }}
            >
              ${property.price_per_night}
            </span>
            <small
              className="text-muted fw-normal"
              style={{ color: theme.palette.text.secondary }}
            >
              {" "}
              per night
            </small>
          </h4>

          <form>
            <div
              className="border rounded mb-3"
              style={{
                borderColor: theme.palette.divider, 
              }}
            >
              <Calendar
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
              />

              <div
                className="border-top p-2"
                style={{
                  borderColor: theme.palette.divider, 
                }}
              >
                <label
                  htmlFor="guests"
                  className="form-label small fw-bold"
                  style={{ color: theme.palette.text.primary }}
                >
                  GUESTS
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="form-select border-0 p-0"
                  id="guests"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                >
                  {guestsRange.map((number) => (
                    <option key={number} value={number}>
                      {number} guest{number > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loggedInUserId !== property.landlord.id && (
              <button
                type="button"
                onClick={performBooking}
                className="btn btn-primary w-100 mb-3"
                style={{ backgroundColor: "#FF385C", borderColor: "#FF385C" }}
              >
                Book
              </button>
            )}
            <p className="text-center mb-4" style={{ color: theme.palette.text.secondary }}>
              You won't be charged yet
            </p>

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

            <hr style={{ borderColor: theme.palette.divider }} />

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

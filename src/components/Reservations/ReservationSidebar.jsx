import { useState, useEffect } from "react";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";
import DatePicker from "./Calendar";
import axios from "axios";

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
  const guestsRange = Array.from(
    { length: property.guests },
    (_, index) => index + 1
  );

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
          const response = await axios.post(
            `/api/properties/${property.id}/book/`,
            formData
          );
          if (response.data.success) {
            console.log("Booking successful");
          } else {
            console.log("Something went wrong...");
          }
        } catch (error) {
          console.error("Error during booking:", error);
        }
      }
    } else {
      // Handle login modal or notification here
      console.log("User needs to log in");
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
      const response = await axios.get(
        `/api/properties/${property.id}/reservations/`
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
    <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
      <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

      <DatePicker
        value={dateRange}
        bookedDates={bookedDates}
        onChange={(value) => _setDateRange(value.selection)}
      />

      <div className="mb-6 p-3 border border-gray-400 rounded-xl">
        <label className="mb-2 block font-bold text-xs">Guests</label>

        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full -ml-1 text-xm"
        >
          {guestsRange.map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>

      <div
        onClick={performBooking}
        className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
      >
        Book
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>
          ${property.price_per_night} * {nights} nights
        </p>
        <p>${property.price_per_night * nights}</p>
      </div>

      <div className="mb-4 flex justify-between align-center">
        <p>Djangobnb fee</p>
        <p>${fee}</p>
      </div>

      <hr />

      <div className="mt-4 flex justify-between align-center font-bold">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </aside>
  );
};

export default ReservationSidebar;

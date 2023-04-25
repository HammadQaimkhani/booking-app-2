import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import Header from "./Header";
import AccountNav from "./AccountNav";
import axios from "axios";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/bookings")
      .then(({ data }) => setBookings(data));
  }, []);

  return (
    <>
      <Header />
      <AccountNav />
      {bookings?.length > 0 &&
        bookings.map(booking => (
          <div>
            <h2>{booking.name}</h2>
            <h2>
              {differenceInCalendarDays(
                new Date(booking.checkOut),
                new Date(booking.checkIn)
              )}
            </h2>
            {/* <h2>{differenceInCalendarDays(new Date(booking.checkOut))}</h2> */}
            <p>{booking.place}</p>
          </div>
        ))}
    </>
  );
};

export default BookingPage;

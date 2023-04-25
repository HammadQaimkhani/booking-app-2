import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import Header from "./Header";
import AccountNav from "./AccountNav";
import { format } from "date-fns";
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
            <h2 className='text-2xl '>{booking.name}</h2>
            <div className='flex gap-2 text-blue-400 '>
              <h2>{format(new Date(booking.checkIn), "dd.MM.yyyy")}</h2>
              <h2 className='text-red-600'>
                {format(new Date(booking.checkOut), "dd.MM.yyyy")}
              </h2>
            </div>
          </div>
        ))}
    </>
  );
};

export default BookingPage;

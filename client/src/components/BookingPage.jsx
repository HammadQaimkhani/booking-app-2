import React, { useEffect, useState } from "react";
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
      <div>{bookings.checkIn}</div>
    </>
  );
};

export default BookingPage;

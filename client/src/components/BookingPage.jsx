import React, { useEffect, useState } from "react";
import Header from "./Header";
import AccountNav from "./AccountNav";
import { differenceInCalendarDays, format } from "date-fns";
import axios from "axios";
import PlaceImg from "./PlaceImg";

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
          <div className='flex gap-4 bg-gray-200  rounded-2xl m-8 overflow-hidden '>
            {/* img div */}
            <div className='w-48 '>
              <PlaceImg place={booking.place} className={"rounded-2xl "} />
            </div>
            {/* data div */}
            <div className='py-3'>
              <h1 className='text-xl'>{booking.place.title}</h1>
              {/* fomate date of booking */}
              <div className='flex gap-2 items-center py-2 font-semibold'>
                <div className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                    />
                  </svg>

                  {format(new Date(booking.checkIn), "dd.MM.yyyy")}
                </div>
                &rarr;
                <div className='flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                    />
                  </svg>
                  {format(new Date(booking.checkOut), "dd.MM.yyyy")}
                </div>
              </div>
              {/* price & nights div */}
              <div className='flex grow gap-2 text-xl'>
                <h2 className=''>
                  <b>
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}
                  </b>
                  &nbsp;nights | price: <b> ${booking.place.price}</b>
                </h2>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default BookingPage;

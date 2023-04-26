import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

const BookingWidget = ({ places }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if ((checkIn, checkOut)) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // create a function to book the place.
  const bookThisPlace = async () => {
    const response = await axios.post(
      "https://booking-app-2-one.vercel.app/bookings",
      {
        place: places._id,
        checkIn,
        checkOut,
        name,
        mobile,
        price: numberOfDays * places.price,
      }
    );
    const bookingId = response.data._id;
    setRedirect("/account/bookings");
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div>
        <div className='bg-white shadow p-4 rounded-2xl mt-4'>
          <div className='text-2xl text-center'>
            price : ${places.price}/ per night
          </div>
          {/* pick the date */}
          <div className='border rounded-2xl mt-4'>
            <div className='flex'>
              <div className='px-3 py-4'>
                <label>Check in : </label>
                <input
                  type='date'
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                />
              </div>
              <div className='px-3 py-4 border-l'>
                <label>Check out : </label>
                <input
                  type='date'
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                />
              </div>
            </div>
            <div className='border-t px-3 py-4 '>
              <label>Number of Guests:</label>
              <br />
              <input
                type='number'
                value={maxGuests}
                onChange={e => setMaxGuests(e.target.value)}
                className='border w-full rounded-2xl p-2 '
              />
            </div>
            {numberOfDays > 0 && (
              <div className='border-t px-3 py-4 '>
                <label>Name :</label>
                <br />
                <input
                  type='text'
                  value={name}
                  placeholder='Hammad'
                  onChange={e => setName(e.target.value)}
                  className='border w-full rounded-2xl p-2 '
                />
                <label>Phone Number :</label>
                <br />
                <input
                  type='tel'
                  value={mobile}
                  placeholder='+9200example00'
                  onChange={e => setMobile(e.target.value)}
                  className='border w-full rounded-2xl p-2 '
                />
              </div>
            )}
          </div>
          <button
            onClick={bookThisPlace}
            className='bg-primary w-full p-2 rounded-2xl text-white mt-4'>
            book this place
            {numberOfDays > 0 && <span> ${numberOfDays * places.price}</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingWidget;

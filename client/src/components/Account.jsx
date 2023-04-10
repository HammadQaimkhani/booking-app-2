import React, { useContext, useState } from "react";
import Header from "./Header";
import { UserContext } from "../userContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Places from "./Places";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logOut = async () => {
    await axios.post("http://127.0.0.1:8000/logout");
    setUser(null);
    setRedirect("/");
  };

  const linkClasses = (type = null) => {
    let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
    if (type == subpage) {
      classes += " bg-primary text-white ";
    } else {
      classes += " bg-gray-200 ";
    }
    return classes;
  };

  if (!user && !redirect && ready) {
    return <Navigate to='/login' />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Header />
      <nav className='w-full flex justify-center mt-8 gap-2 '>
        <Link className={linkClasses("profile")} to={"/account"}>
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
              d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
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
              d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z'
            />
          </svg>
          My Bookings
        </Link>

        <Link className={linkClasses("places")} to={"/account/places"}>
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
              d='M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819'
            />
          </svg>
          My Accommodation
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className='text-center mt-8 font-semibold'>
          logged in as {user.name} ({user.email})
          <br />
          <button
            className='bg-primary text-white font-normal px-6 py-2 rounded-full w-[400px] mt-6'
            onClick={logOut}>
            Log out
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </>
  );
};

export default Account;

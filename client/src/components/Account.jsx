import React, { useContext, useState } from "react";
import Header from "./Header";
import { UserContext } from "../userContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser } = useContext(UserContext);
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
    let classes = "py-2 px-6";
    if (type == subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Header />

      <nav className='w-full flex justify-center mt-8 gap-2'>
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Accommodation
        </Link>

        <Link className={linkClasses("places")} to={"/account/places"}>
          My Bookings
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
    </>
  );
};

export default Account;

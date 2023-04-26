import React, { useContext, useState } from "react";
import Header from "./Header";
import { UserContext } from "../userContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import AccountNav from "./AccountNav";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  const logOut = async () => {
    await axios.post("https://booking-app-2-one.vercel.app/logout");
    setUser(null);
    setRedirect("/");
  };

  if (!user && !redirect && ready) {
    return <Navigate to='/login' />;
  }

  if (redirect) {
    console.log(redirect);
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <Header />
      <AccountNav />

      <div className='text-center mt-8 font-semibold'>
        logged in as {user?.name} ({user?.email})
        <br />
        <button
          className='bg-primary text-white font-normal px-6 py-2 rounded-full w-[400px] mt-6'
          onClick={logOut}>
          Log out
        </button>
      </div>
    </>
  );
};

export default Account;

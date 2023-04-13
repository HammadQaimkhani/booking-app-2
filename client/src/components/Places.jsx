import React from "react";

import { Link, useParams } from "react-router-dom";

import PlacesFormPage from "./PlacesFormPage";
import Header from "./Header";
import AccountNav from "./AccountNav";

const Places = () => {
  return (
    <div className=''>
      <Header />
      <AccountNav />
      <div className='text-center mt-4'>
        <Link
          className='inline-flex gap-1  bg-primary text-white px-6 py-2 rounded-full'
          to='/account/places/new'>
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
              d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Add new places
        </Link>
      </div>
    </div>
  );
};

export default Places;

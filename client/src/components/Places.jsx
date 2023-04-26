import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AccountNav from "./AccountNav";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PlaceImg from "./PlaceImg";

const Places = () => {
  // create a useState for Places data.
  const [places, setPlaces] = useState([]);

  // create a useEffect hook for fetch the added places data.
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
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
      <div className='mt-4'>
        {places.length > 0 &&
          places.map((place, index) => (
            <Link
              key={index}
              to={"/account/places/" + place._id}
              className=' flex gap-4 bg-gray-100 p-4 rounded-2xl mx-2 mb-2'>
              <div className=' flex w-32 h-32 bg-gray-300 grow shrink-0'>
                <PlaceImg place={place} />
              </div>
              <div className=''>
                <h2 className='text-xl '>{place.title}</h2>
                <p className='text-sm mt-2'>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Places;

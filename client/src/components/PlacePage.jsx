import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "./BookingWidget";

const PlacePage = () => {
  const { id } = useParams();

  const [places, setPlaces] = useState([]);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  //   create a useEffect Hook for fetch the data in DB.
  useEffect(() => {
    if (id) {
      axios.get("http://127.0.0.1:8000/place/" + id).then(({ data }) => {
        setPlaces(data);
      });
    }
    return;
  }, [id]);

  // check the places exist || not exist
  if (!places) {
    return "";
  }

  // show all the photos
  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black p-8 grid gap-2 '>
          <div className=''>
            <h2 className='text-3xl'>Photo of {places.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed right-12 top-8 flex gap-2 py-2 px-4 rounded-2xl bg-white text-black shadow-md shadow-black '>
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
              Close photo
            </button>
          </div>
          {places.photos?.length > 0 &&
            places.photos.map(place => (
              <div className=''>
                <img src={"http://localhost:8000/uploads/" + place} alt='' />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className='px-8 py-8 bg-gray-100  '>
        {/* title */}
        <h1 className='text-3xl'>{places.title}</h1>
        {/* address */}
        <a
          target='_blank'
          href={"https://map.google.com/?q=" + places.address}
          className='underline font-semibold py-2 flex gap-2'>
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
              d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
            />
          </svg>

          {places.address}
        </a>
        {/* photos */}
        <div className='relative'>
          <div className='grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden '>
            <div>
              {places.photos?.[0] && (
                <div>
                  <img
                    className='aspect-square object-cover'
                    src={"http://localhost:8000/uploads/" + places.photos[0]}
                    alt=''
                  />
                </div>
              )}
            </div>
            <div className='grid'>
              {places.photos?.[1] && (
                <img
                  className='aspect-square object-cover'
                  src={"http://localhost:8000/uploads/" + places.photos[1]}
                  alt=''
                />
              )}
              <div className='overflow-hidden'>
                {places.photos?.[2] && (
                  <img
                    className='aspect-square object-cover'
                    src={"http://localhost:8000/uploads/" + places.photos[2]}
                    alt=''
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className=' flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white border border-black rounded-2xl shadow-gray-500 shadow-md '>
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
                d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
              />
            </svg>
            see more photos
          </button>
        </div>

        {/* Display the data of CheckIn || CheckOut || maxGuests || Price || Description */}

        <div className='my-4'>
          <h2 className='text-2xl font-semibold'>Description</h2>
          {places.description}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
          <div>
            Check in : {places.checkIn}
            <br />
            Check out : {places.checkOut}
            <br />
            Number of Guests : {places.maxGuests}
          </div>
          {/* <BookingWidget selected={places} onChange={setPlaces} /> */}
        </div>
      </div>
    </>
  );
};

export default PlacePage;

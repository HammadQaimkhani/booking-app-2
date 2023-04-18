import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlacePage = () => {
  const { id } = useParams();

  const [places, setPlaces] = useState([]);

  //   create a useEffect Hook for fetch the data in DB.
  useEffect(() => {
    if (id) {
      axios.get("http://127.0.0.1:8000/place/" + id).then(({ data }) => {
        setPlaces(data);
      });
    }
    return;
  }, [id]);
  return (
    <>
      <Header />

      <div className='px-8 py-8 bg-gray-100 '>
        {/* title */}
        <h1 className='text-3xl'>{places.title}</h1>
        {/* address */}
        <a
          target='_blank'
          href={"https://map.google.com/?q=" + places.address}
          className='underline font-semibold block my-2'>
          {places.address}
        </a>
        {/* photos */}
        <div className='grid grid-cols-[2fr_1fr] gap-2'>
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
          <div className='grid gap-2 overflow-hidden'>
            {places.photos?.[1] && (
              <img
                className='aspect-square object-cover'
                src={"http://localhost:8000/uploads/" + places.photos[1]}
                alt=''
              />
            )}
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
    </>
  );
};

export default PlacePage;

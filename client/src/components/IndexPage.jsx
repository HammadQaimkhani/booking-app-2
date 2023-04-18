import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className='grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 px-8 py-4'>
        {places.length > 0 &&
          places.map(place => (
            <Link to={"/place/" + place._id}>
              <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                {place.photos?.[0] && (
                  <img
                    className='rounded-2xl object-cover aspect-square'
                    src={"http://localhost:8000/uploads/" + place.photos?.[0]}
                    alt=''
                  />
                )}
              </div>

              <h2 className='font-bold leading-4'>{place.address}</h2>
              <h3 className='text-sm truncate text-gray-500'>{place.title}</h3>
              <div className=''>
                <span className='font-bold'>${place.price} </span>
                per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;

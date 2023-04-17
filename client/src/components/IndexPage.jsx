import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/places").then(({ data }) => {
      setPlaces([...data, ...data, ...data, ...data, ...data, ...data]);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className='grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 px-8 py-4'>
        {places.length > 0 &&
          places.map(place => (
            <div className=''>
              <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                {place.photos?.[0] && (
                  <img
                    className='rounded-2xl object-cover aspect-square'
                    src={"http://localhost:8000/uploads/" + place.photos?.[0]}
                    alt=''
                  />
                )}
              </div>

              <h1 className='text-sm truncate'>{place.title}</h1>
              <p className='font-bold leading-4'>{place.address}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default IndexPage;

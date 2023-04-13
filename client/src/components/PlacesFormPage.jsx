import React from "react";

import Perks from "./Perks";
import PhotoUploded from "./PhotoUploded";
import { useState } from "react";
import axios from "axios";
import AccountNav from "./AccountNav";
import Header from "./Header";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  // useState for Inputs of place page.
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  // created a onSubmit function for Submit the form.
  const addNewPlaces = async e => {
    e.preventDefault();
    const { data } = await axios.post("http://127.0.0.1:8000/places", {
      title,
      address,
      addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect("/account/places");
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div>
        <Header />
        <AccountNav />
        <form className='m-4' onSubmit={addNewPlaces}>
          {/* code for title */}
          <h2 className='text-2xl mt-4 px-2'>Title</h2>
          <p className='text-gray-500 text-sm px-2'>
            Title for your place should be short and cachy for advertisment
          </p>
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='title, for example my lovely appartment'
            className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
          />
          {/* code for Address */}

          <h2 className='text-2xl mt-4 px-2'>Address</h2>
          <p className='text-gray-500 text-sm px-2'>Address for this place</p>
          <input
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
          />
          {/* code for photos upload */}

          <PhotoUploded addedPhoto={addedPhoto} onChange={setAddedPhoto} />
          {/* code for Description */}
          <h2 className='text-2xl mt-4 px-2'>Description</h2>
          <p className='text-gray-500 text-sm px-2'>description of the place</p>
          <textarea
            className='h-32  '
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {/* code for Perks */}
          <Perks selected={perks} onChange={setPerks} />
          {/* code for Extra Info */}
          <h2 className='text-2xl mt-4 px-2'>Extra info</h2>
          <p className='text-gray-500 text-sm px-2'>house, rules, etc. </p>
          <textarea
            value={extraInfo}
            onChange={e => setExtraInfo(e.target.value)}
          />

          {/* code for Check in & out */}
          <h2 className='text-2xl mt-4 px-2'>
            Check in & out times, max guests
          </h2>
          <p className='text-gray-500 text-sm px-2'>
            add check in & out times, remember to have some time window for
            cleaning the room between guests
          </p>
          <div className='grid sm:grid-cols-3 gap-2'>
            <div>
              <h3 className='mt-2  ml-4'>check in time</h3>
              <input
                type='text'
                placeholder='14:00'
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
              />
            </div>
            <div>
              <h3 className='mt-2  ml-4'>check out time</h3>

              <input
                type='number'
                placeholder='11:00'
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
              />
            </div>
            <div>
              <h3 className='mt-2 ml-4'>max guest</h3>

              <input
                type='text'
                placeholder='4'
                value={maxGuests}
                onChange={e => setMaxGuests(e.target.value)}
                className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
              />
            </div>
          </div>
          <div>
            <button className='bg-primary text-white my-4 py-2 w-full rounded-2xl text-xl'>
              save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;

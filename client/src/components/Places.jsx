import React from "react";
import { useState } from "react";
import axios from "axios  ";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";

const Places = () => {
  const { action } = useParams();

  // useState for Inputs of place page.
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  // function for added photo by link.
  const addedPhotosByLink = async e => {
    e.preventDefault();
    const { data: fileName } = await axios.post(
      "http://127.0.0.1:8000/upload-by-links",
      {
        link: photoLink,
      }
    );
    setAddedPhoto(preValue => {
      return [...preValue, fileName];
    });
    setPhotoLink("");
  };

  // upload photo by using upload button
  const uploadPhoto = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.set("files", files);
    const { data: fileName } = await axios.post("/uploads", data, {
      Headers: {
        "Content-type": "multipart/form-data",
      },
    });
    setAddedPhoto(preValue => {
      return [...preValue, fileName];
    });
  };

  return (
    <div className=''>
      {action !== "new" && (
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
      )}

      {action === "new" && (
        <div>
          <form className='m-4'>
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
            <h2 className='text-2xl mt-4 px-2'>Photos</h2>
            <p className='text-gray-500 text-sm px-2'>more = better</p>
            <div className='flex gap-2'>
              <input
                type='text'
                value={photoLink}
                onChange={e => setPhotoLink(e.target.value)}
                placeholder='Add using a link.....jpg'
                className='w-full mx-2 p-2 border border-gray-200 rounded-2xl'
              />
              <button
                className='bg-gray-500 px-4 text-white rounded-2xl '
                onClick={addedPhotosByLink}>
                Add&nbsp;Photos
              </button>
            </div>
            <div className='mt-2  gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {/* added photo by links */}
              {addedPhoto.length > 0 &&
                addedPhoto.map(link => (
                  <div className=''>
                    <img
                      src={`http://localhost:8000/uploads/${link}`}
                      alt=''
                      className='rounded-2xl'
                    />
                  </div>
                ))}

              <label className=' cursor-pointer border border-dashed bg-transparent rounded-2xl p-8 text-2xl text-gray-500 flex justify-center items-center gap-2'>
                <input type='file' className='hidden ' onChange={uploadPhoto} />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-8 h-8'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z'
                  />
                </svg>
                upload
              </label>
            </div>
            {/* code for Description */}
            <h2 className='text-2xl mt-4 px-2'>Description</h2>
            <p className='text-gray-500 text-sm px-2'>
              description of the place
            </p>
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
      )}
    </div>
  );
};

export default Places;

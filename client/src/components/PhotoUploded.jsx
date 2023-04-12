import React from "react";
import { useState } from "react";
import axios from "axios  ";

const PhotoUploded = ({ addedPhoto, onChange }) => {
  // useState for Inputs of Photo uploaded page.

  const [photoLink, setPhotoLink] = useState("");

  // function for added photo by link.

  const addedPhotosByLink = async e => {
    e.preventDefault();

    const { data: fileName } = await axios.post(
      "http://127.0.0.1:8000/upload-by-links",
      {
        link: photoLink,
      }
    );
    onChange(preValue => {
      return [...preValue, fileName];
    });
    setPhotoLink("");
  };

  // upload photo by using upload button
  const uploadPhoto = async e => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i <= files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("http://127.0.0.1:8000/uploads", data, {
        Headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(response => {
        const { data: fileName } = response;
        onChange(preValue => {
          return [...preValue, ...fileName];
        });
      });
  };
  return (
    <>
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
            <div className='h-32 flex' key={link}>
              <img
                src={`http://localhost:8000/uploads/${link}`}
                alt=''
                className='rounded-2xl w-full object-cover'
              />
            </div>
          ))}

        <label className=' cursor-pointer border border-dashed bg-transparent rounded-2xl p-8 text-2xl text-gray-500 flex justify-center items-center gap-2'>
          <input
            type='file'
            className='hidden '
            onChange={uploadPhoto}
            multiple
          />
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
    </>
  );
};

export default PhotoUploded;

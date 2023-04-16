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

  // remove photo by button.
  const removePhoto = fileName => {
    onChange([
      ...addedPhoto.filter(photo => {
        return photo !== fileName;
      }),
    ]);
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
            <div className='h-32 flex relative' key={link}>
              <img
                src={`http://localhost:8000/uploads/${link}`}
                alt=''
                className='rounded-2xl w-full object-cover'
              />
              <button
                onClick={() => removePhoto(link)}
                className='absolute bottom-1 right-1 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
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

import React from "react";
import { Link, useParams } from "react-router-dom";

const Places = () => {
  const { action } = useParams();
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
        <form>
          <h2 className='text-2xl mt-4 px-2'>Title</h2>
          <p className='text-gray-500 text-sm px-2'>
            Title for your place should be short and cachy for advertisment
          </p>
          <input
            type='text'
            placeholder='title, for example my lovely appartment'
            className='w-full mx-2'
          />
          <h2 className='text-2xl mt-4 px-2'>Address</h2>
          <input type='text' placeholder='Address' />
          <h2 className='text-2xl mt-4 px-2'>Photos</h2>
        </form>
      )}
    </div>
  );
};

export default Places;

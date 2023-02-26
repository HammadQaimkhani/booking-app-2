import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className='p-6 flex items-center justify-between font-roboto '>
        {/* logo div */}
        <Link to={"/"}>
          <div className='flex items-center cursor-pointer '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-10 h-10 -rotate-90 text-primary'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
            <h1 className='text-primary font-bold text-lg font-roboto'>
              airbhb
            </h1>
          </div>
        </Link>

        {/* middle section of the header */}
        <div className='flex  items-center shadow-md shadow-gray-300 py-2 px-4 rounded-full gap-2 border border-gray-300  '>
          <div className='border-r-2 px-2 cursor-pointer'>Anywhere</div>
          <div className='border-r-2 px-2 cursor-pointer'>Any week</div>

          <div className='text-gray-400 font-normal cursor-pointer'>
            Add guests
          </div>
          <button className='bg-primary p-2 rounded-full cursor-pointer '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-4 h-4 text-white'>
              <path
                fillRule='evenodd'
                d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>

        {/* Login section */}
        <Link to='/login'>
          <div className='flex items-center gap-2 shadow-md shadow-gray-300 px-4 py-2 rounded-full border border-gray-400 cursor-pointer'>
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
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-8 h-8 text-gray-700'>
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </Link>
      </header>
    </>
  );
};

export default Header;

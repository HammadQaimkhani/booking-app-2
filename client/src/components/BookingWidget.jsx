import React from "react";

const BookingWidget = () => {
  return (
    <>
      <div>
        <div className='bg-white shadow p-4 rounded-2xl'>
          <div className='text-2xl text-center'>
            price : ${places.price}/ per night
          </div>
          {/* pick the date */}
          <div className='border rounded-2xl mt-4'>
            <div className='flex'>
              <div className='px-3 py-4'>
                <label>Check in : </label>
                <input type='date' />
              </div>
              <div className='px-3 py-4 border-l'>
                <label>Check out : </label>
                <input type='date' />
              </div>
            </div>

            <div className='border-t px-3 py-4 '>
              <label>Number of Guests:</label>
              <br />
              <input
                type='number'
                value={2}
                className='border w-full rounded-2xl p-2 '
              />
            </div>
          </div>
          <button className='bg-primary w-full p-2 rounded-2xl text-white mt-4'>
            book this place
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingWidget;

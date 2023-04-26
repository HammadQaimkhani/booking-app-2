import { ca } from "date-fns/locale";
import React from "react";

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      className={className}
      src={
        "https://booking-app-2-one.vercel.app/uploads/" + place.photos[index]
      }
      alt=''
    />
  );
};

export default PlaceImg;

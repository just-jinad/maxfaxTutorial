import React from "react";

const GeneratedPin = ({ pin }) => {
  return (
    pin && (
      <div className="mt-4 p-2 bg-green-100 rounded-md">
        <p>Your quiz PIN: {pin}</p>
      </div>
    )
  );
};

export default GeneratedPin;

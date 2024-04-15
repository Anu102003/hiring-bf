import React from 'react';

const Participants = ({ name, areaOfInterest }) => {
  return (
    <div className="participant-details">
      <h3>Name: {name}</h3>
      <p>Area of Interest: {areaOfInterest}</p>
    </div>
  );
};

export default Participants;
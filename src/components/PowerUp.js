import React from 'react';

const PowerUp = ({ x, y, type, duration }) => {
  // Implement the appearance and behavior of power-ups
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 20,
        height: 20,
        backgroundColor: 'yellow', // Customize the appearance
      }}
    >
      {/* Display power-up type or timer */}
      <p>{type}</p>
      <p>{duration} seconds</p>
    </div>
  );
};

export default PowerUp;

import React from 'react';

const Ball = ({ x, y, radius }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x - radius,
        top: y - radius,
        width: radius * 2,
        height: radius * 2,
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    ></div>
  );
};

export default Ball;

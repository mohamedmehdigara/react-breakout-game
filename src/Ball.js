import React from 'react';

const Ball = ({ x, y, radius }) => {
  const style = {
    position: 'absolute',
    left: x - radius,
    top: y - radius,
    width: radius * 2,
    height: radius * 2,
    backgroundColor: 'red',
    borderRadius: '50%',
  };

  return <div style={style}></div>;
};

export default Ball;

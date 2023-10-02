import React, { useEffect } from 'react';

const Paddle = ({ x, y, width, height }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        x((prevX) => Math.max(0, prevX - 5)); // Use x as a function to update the paddle's position
      } else if (e.code === 'ArrowRight') {
        x((prevX) => Math.min(480 - width, prevX + 5)); // Use x as a function to update the paddle's position
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [x, width]);

  const style = {
    position: 'absolute',
    left: x,
    top: y,
    width: width,
    height: height,
    backgroundColor: 'blue',
  };

  return <div style={style}></div>;
};

export default Paddle;

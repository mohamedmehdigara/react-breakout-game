import React, { useEffect } from 'react';

const Paddle = ({ x, setPaddleX, width, height }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        setPaddleX((prevX) => Math.max(0, prevX - 5));
      } else if (e.code === 'ArrowRight') {
        setPaddleX((prevX) => Math.min(480 - width, prevX + 5));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setPaddleX, width]);

  const style = {
    position: 'absolute',
    left: x,
    top: 600, // You can use a fixed value for the Y position if the paddle doesn't need to move vertically
    width: width,
    height: height,
    backgroundColor: 'blue',
  };

  return <div style={style}></div>;
};

export default Paddle;

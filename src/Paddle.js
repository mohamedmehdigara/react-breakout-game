import React, { useEffect } from 'react';

const Paddle = ({ x, y, width, height }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        x((prevX) => prevX - 5);
      } else if (e.code === 'ArrowRight') {
        x((prevX) => prevX + 5);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [x]);

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

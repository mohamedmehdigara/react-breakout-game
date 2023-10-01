import React, { useEffect } from 'react';
import styled from 'styled-components';

const PaddleContainer = styled.div`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: blue;
`;

const Paddle = ({ x, y, width, height }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        x((prevX) => Math.max(0, prevX - 5));
      } else if (e.code === 'ArrowRight') {
        x((prevX) => Math.min(480 - width, prevX + 5));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [x, width]);

  return <PaddleContainer x={x} y={y} width={width} height={height} />;
};

export default Paddle;

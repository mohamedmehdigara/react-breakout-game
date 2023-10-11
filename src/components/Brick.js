import React from 'react';
import styled from 'styled-components';

const BrickContainer = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  border: 1px solid #000;
`;

const Brick = ({ width, height, color }) => {
  return <BrickContainer width={width} height={height} color={color} />;
};

export default Brick;

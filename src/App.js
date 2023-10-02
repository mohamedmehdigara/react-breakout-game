import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Paddle from './Paddle';
import Brick from './Brick';

const GameContainer = styled.div`
  position: relative;
  width: 480px;
  height: 640px;
  border: 1px solid #000;
`;

const App = () => {
  const [paddleX, setPaddleX] = useState(200);
  const [ballX, setBallX] = useState(240);
  const [ballY, setBallY] = useState(300);
  const [ballSpeedX, setBallSpeedX] = useState(5);
  const [ballSpeedY, setBallSpeedY] = useState(5);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        setPaddleX((prevX) => Math.max(0, prevX - 10));
      } else if (e.code === 'ArrowRight') {
        setPaddleX((prevX) => Math.min(400, prevX + 10));
      } else if (e.code === 'Space') {
        setBallSpeedY((prevY) => -prevY);
      }
    };

    const updateBallPosition = () => {
      setBallX((prevX) => prevX + ballSpeedX);
      setBallY((prevY) => prevY + ballSpeedY);

      if (ballX < 0 || ballX > 480) {
        setBallSpeedX((prevSpeedX) => -prevSpeedX);
      }
      if (ballY < 0 || ballY > 640) {
        setBallSpeedY((prevSpeedY) => -prevSpeedY);
      }
    };

    const gameLoop = setInterval(updateBallPosition, 20);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ballX, ballY, ballSpeedX, ballSpeedY]);

  const bricksData = [
    { id: 1, width: 60, height: 20, color: 'red' },
    { id: 2, width: 60, height: 20, color: 'blue' },
  ];

  return (
    <div>
      <h1>Breakout Game</h1>
      <GameContainer>
      <Paddle x={setPaddleX} y={600} width={80} height={10} />
        {bricksData.map((brick) => (
          <Brick key={brick.id} width={brick.width} height={brick.height} color={brick.color} />
        ))}
        <div
          style={{
            position: 'absolute',
            left: ballX,
            top: ballY,
            width: 10,
            height: 10,
            backgroundColor: 'black',
            borderRadius: '50%',
          }}
        />
      </GameContainer>
    </div>
  );
};

export default App;

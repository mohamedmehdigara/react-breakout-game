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
  const [ballDropped, setBallDropped] = useState(false); // Track if the ball has dropped below the paddle

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft') {
        setPaddleX((prevX) => Math.max(0, prevX - 10));
      } else if (e.code === 'ArrowRight') {
        setPaddleX((prevX) => Math.min(400, prevX + 10));
      }
    };

    const updateBallPosition = () => {
      if (!ballDropped) {
        // If the ball has not dropped, update its position based on speed
        setBallX((prevX) => prevX + ballSpeedX);
        setBallY((prevY) => prevY + ballSpeedY);

        // Check for boundary collisions
        if (ballX < 0 || ballX > 480) {
          setBallSpeedX((prevSpeedX) => -prevSpeedX);
        }

        // If the ball reaches the bottom, bounce it back up
        if (ballY > 640) {
          setBallSpeedY((prevSpeedY) => -prevSpeedY);
          setBallDropped(true);
        }

        // Check for paddle collision
        if (
          ballY + 10 >= 600 && // Ball is at or below the top of the paddle
          ballY + 10 <= 610 && // Ball is at or above the bottom of the paddle
          ballX + 10 >= paddleX && // Ball is to the right of the left edge of the paddle
          ballX <= paddleX + 80 // Ball is to the left of the right edge of the paddle
        ) {
          setBallSpeedY((prevSpeedY) => -prevSpeedY); // Bounce the ball back up
        }
      } else {
        // If the ball has dropped below the paddle, reset it to the top
        setBallX(240);
        setBallY(0);
        setBallSpeedY(5);
        setBallDropped(false);
      }
    };

    const gameLoop = setInterval(updateBallPosition, 20);

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ballX, ballY, ballSpeedX, ballSpeedY, ballDropped, paddleX]);

  const bricksData = [
    { id: 1, width: 60, height: 20, color: 'red' },
    { id: 2, width: 60, height: 20, color: 'blue' },
  ];

  return (
    <div>
      <h1>Breakout Game</h1>
      <GameContainer>
        <Paddle x={paddleX} y={600} width={80} height={10} />
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

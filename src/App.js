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
  const [ballY, setBallY] = useState(100);
  const [ballSpeedX, setBallSpeedX] = useState(5);
  const [ballSpeedY, setBallSpeedY] = useState(5);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [bricks, setBricks] = useState([
    { id: 1, x: 50, y: 50, width: 60, height: 20, color: 'red' },
    { id: 2, x: 150, y: 50, width: 60, height: 20, color: 'blue' },
    // Add more bricks here
  ]);

  useEffect(() => {
    // Function to check collision between two rectangles
    const isColliding = (rect1, rect2) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };
  
    // Function to remove a brick from the array
    const removeBrick = (brickId) => {
      setBricks((prevBricks) => prevBricks.filter((brick) => brick.id !== brickId));
      setScore((prevScore) => prevScore + 10); // Increase score
    };
  
    // Check for brick collisions and remove bricks
    bricks.forEach((brick) => {
      const brickRect = {
        x: brick.x,
        y: brick.y,
        width: brick.width,
        height: brick.height,
      };
  
      const ballRect = {
        x: ballX,
        y: ballY,
        width: 10, // Ball's width
        height: 10, // Ball's height
      };
  
      if (isColliding(ballRect, brickRect)) {
        removeBrick(brick.id);
        setBallSpeedY((prevSpeedY) => -prevSpeedY); // Bounce the ball
      }
    });
  
    // Check for game over condition
    if (ballY > 640 && lives > 1) {
      // Reset the ball and lose a life
      setBallX(240);
      setBallY(100);
      setBallSpeedY(5);
      setLives((prevLives) => prevLives - 1);
    } else if (lives === 1 && ballY > 640) {
      // Game over, no lives left
      alert('Game Over! Your Score: ' + score);
      // Implement more actions like restarting the game here if needed
    }
  
    // Check for victory condition
    if (bricks.length === 0) {
      alert('Congratulations! You won!');
      // Implement actions for winning the game, such as restarting or advancing to the next level
    }
  
    // Update ball and paddle positions
    setBallX((prevX) => prevX + ballSpeedX);
    setBallY((prevY) => prevY + ballSpeedY);
  
    // Implement game restart
    // You can add a function to restart the game here
  
  }, [ballX, ballY, ballSpeedX, ballSpeedY, paddleX, bricks, lives, score]);
    
  // Render bricks

  return (
    <div>
      <h1>Breakout Game</h1>
      <GameContainer>
        <Paddle x={paddleX} y={600} width={80} height={10} />
        {bricks.map((brick) => (
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
      <div>
        <p>Lives: {lives}</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
};

export default App;

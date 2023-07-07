import React, { useState, useEffect, useRef } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import './App.css';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;
const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 10;
const BRICK_ROWS = 5;
const BRICK_COLUMNS = 8;
const BRICK_WIDTH = CANVAS_WIDTH / BRICK_COLUMNS;
const BRICK_HEIGHT = 20;

const App = () => {
  const canvasRef = useRef(null);
  const [paddleX, setPaddleX] = useState((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const [ballX, setBallX] = useState(CANVAS_WIDTH / 2);
  const [ballY, setBallY] = useState(CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS);
  const [ballDx, setBallDx] = useState(2);
  const [ballDy, setBallDy] = useState(-2);
  const [score, setScore] = useState(0);
  const [bricks, setBricks] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const createBricks = () => {
      const brickArr = [];
      for (let row = 0; row < BRICK_ROWS; row++) {
        for (let col = 0; col < BRICK_COLUMNS; col++) {
          brickArr.push({
            x: col * BRICK_WIDTH,
            y: row * BRICK_HEIGHT,
            width: BRICK_WIDTH,
            height: BRICK_HEIGHT,
            visible: true,
          });
        }
      }
      return brickArr;
    };

    setBricks(createBricks());

    const updateGame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw bricks
      bricks.forEach((brick) => {
        if (brick.visible) {
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = 'green';
          ctx.fill();
          ctx.closePath();
        }
      });

      // Draw paddle
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();

      // Move the ball
      setBallX(ballX + ballDx);
      setBallY(ballY + ballDy);

      // Collision detection with paddle
      if (
        ballY + ballDy > canvas.height - PADDLE_HEIGHT - BALL_RADIUS &&
        ballX > paddleX &&
        ballX < paddleX + PADDLE_WIDTH
      ) {
        setBallDy(-ballDy);
      }

      // Collision detection with bricks
      bricks.forEach((brick, index) => {
        if (brick.visible) {
          if (
            ballX + BALL_RADIUS > brick.x &&
            ballX - BALL_RADIUS < brick.x + brick.width &&
            ballY + BALL_RADIUS > brick.y &&
            ballY - BALL_RADIUS < brick.y + brick.height
          ) {
            setBallDy(-ballDy);
            brick.visible = false;
            setScore((prevScore) => prevScore + 1);
            if (score + 1 === BRICK_ROWS * BRICK_COLUMNS) {
              // Game over (all bricks destroyed)
              document.location.reload();
            }
          }
        }
      });

      // Collision detection with walls
      if (ballX + ballDx > canvas.width - BALL_RADIUS || ballX + ballDx < BALL_RADIUS) {
        setBallDx(-ballDx);
      }
      if (ballY + ballDy < BALL_RADIUS) {
        setBallDy(-ballDy);
      } else if (ballY + ballDy > canvas.height - BALL_RADIUS) {
        // Game over (ball fell off the screen)
        document.location.reload();
      }
    };

    const gameLoop = setInterval(updateGame, 10);

    return () => {
      clearInterval(gameLoop);
    };
  }, [ballX, ballY, ballDx, ballDy, paddleX, bricks, score]);

  return (
    <div className="App">
      <div>Score: {score}</div>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}></canvas>
    </div>
  );
};

export default App;

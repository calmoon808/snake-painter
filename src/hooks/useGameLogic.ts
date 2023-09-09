import { useState, useEffect, createContext, useContext } from "react";
import useInterval from "./useInterval";
import createSnakeMovement from "../components/SnakeGame/movement";
import { SEGMENT_SIZE } from "../components/SnakeGame/drawSnake";
import generateRandomFoodPos from "../components/SnakeGame/generateRandomFoodPos";

export interface UseGameLogicArgs {
  canvasWidth?: number;
  canvasHeight?: number;
}

export interface Position {
  x: number;
  y: number;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

let MOVEMENT_SPEED = 75; // 75 = easy/slowest - 15 = very hard/fastest

const useGameLogic = ({ canvasHeight, canvasWidth }: UseGameLogicArgs) => {
  const [snakeDir, setSnakeDir] = useState<Direction>();
  const [startingPosX, setStartingPosX] = useState(SEGMENT_SIZE * -3)
  const [startingPosY, setStartingPosY] = useState(SEGMENT_SIZE * -3)
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [foodPosition, setFoodPosition] = useState<Position | undefined>();
  const [isSnakeMoving, setIsSnakeMoving] = useState(false);
  const [snakeBody, setSnakeBody] = useState<Position[]>([
    {
      x: startingPosX,
      y: startingPosY
    }
  ]);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const canvas = document.getElementById("snakeCanvas")
    if (canvas) {
      let x = Math.trunc(canvas.offsetWidth / 2);
      let y = Math.trunc(canvas.offsetHeight / 2);
      setStartingPosX(Math.round(x / SEGMENT_SIZE) * SEGMENT_SIZE);
      setStartingPosY(Math.round(y / SEGMENT_SIZE) * SEGMENT_SIZE);
    }
    if (canvasHeight && canvasWidth) {
      const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody })
      setFoodPosition(newFoodPos)
    }
  }, [canvasHeight, canvasWidth, gameStart])

  useEffect(() => {
    setSnakeBody([
      {
        x: startingPosX + SEGMENT_SIZE,
        y: startingPosY,
      },
      {
        x: startingPosX,
        y: startingPosY,
      },
      {
        x: startingPosX - SEGMENT_SIZE,
        y: startingPosY,
      }
    ])
  }, [startingPosX, startingPosY, gameOver]);

  useEffect(() => {
    // decrement speed/increasedifficulty by 5 each time player scores 3 points
    if (score % 3 === 0 && MOVEMENT_SPEED > 15) {
      MOVEMENT_SPEED -= 5;
    }
  }, [score]);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isSnakeMoving) return;
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        setIsSnakeMoving(true);
        if (snakeDir !== Direction.DOWN) setSnakeDir(Direction.UP)
        break;
      case "KeyS":
      case "ArrowDown":
        setIsSnakeMoving(true);
        if (snakeDir !== Direction.UP) setSnakeDir(Direction.DOWN)
        break;
      case "KeyA":
      case "ArrowLeft":
        setIsSnakeMoving(true);
        if (snakeDir !== Direction.RIGHT) setSnakeDir(Direction.LEFT)
        break;
      case "KeyD":
      case "ArrowRight":
        setIsSnakeMoving(true);
        if (snakeDir !== Direction.LEFT) setSnakeDir(Direction.RIGHT)
        break;
    }
  }

  const gameOverCheck = () => {
    if (!gameStart) return;
    const canvas = document.getElementById("snakeCanvas")
    if (canvas) {
      const head = snakeBody[0];
      const body = snakeBody.slice(1);

      body.forEach((segment) => {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          return
        }
      })

      if (head.x > canvas.offsetWidth || head.x < 0 || head.y > canvas.offsetHeight || head.y < -SEGMENT_SIZE) {
        setGameOver(true);
      }
    }
  }

  const { moveRight, moveLeft, moveUp, moveDown } = createSnakeMovement(foodPosition);
  const moveSnake = () => {
    const canvas = document.getElementById("snakeCanvas")
    gameOverCheck()
    let newSnake;
    let newSnakeBody;
    switch (snakeDir) {
      case Direction.UP:
        newSnake = moveUp(snakeBody);
        newSnakeBody = newSnake.newSnake
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody });
          setFoodPosition(newFoodPos);
          setScore(score + 1)
        }
        setSnakeBody(newSnakeBody);
        setIsSnakeMoving(false);
        break;
      case Direction.DOWN:
        newSnake = moveDown(snakeBody);
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody });
          setFoodPosition(newFoodPos);
          setScore(score + 1)
        }
        setSnakeBody(newSnakeBody);
        setIsSnakeMoving(false);
        break;
      case Direction.LEFT:
        newSnake = moveLeft(snakeBody);
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody });
          setFoodPosition(newFoodPos);
          setScore(score + 1)
        }
        setSnakeBody(newSnakeBody);
        setIsSnakeMoving(false);
        break;
      case Direction.RIGHT:
        newSnake = moveRight(snakeBody)
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody });
          setFoodPosition(newFoodPos);
          setScore(score + 1)
        }
        setSnakeBody(newSnakeBody);
        setIsSnakeMoving(false);
        break;
    }
  }

  useEffect(() => {
    if (!gameOver) return;
    let highScoreStr = localStorage.getItem("highScore");
    if (highScoreStr) {
      if (score > parseInt(highScoreStr)) {
        localStorage.setItem("highScore", `${score}`)
      }
    }
    setScore(0);
  }, [gameOver])

  useInterval(moveSnake, (gameOver || !gameStart) ? null : MOVEMENT_SPEED)

  return {
    snakeBody,
    handleOnKeyDown,
    foodPosition,
    score,
    gameStart,
    setGameStart,
    gameOver,
    setGameOver,
    setSnakeDir,
  }
}

export default useGameLogic;
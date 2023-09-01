import { useState, useEffect } from "react";
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

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

const MOVEMENT_SPEED = 75;

const useGameLogic = ({ canvasHeight, canvasWidth }: UseGameLogicArgs) => {
  const [snakeDir, setSnakeDir] = useState<Direction>();
  const [startingPosX, setStartingPosX] = useState(SEGMENT_SIZE * -3)
  const [startingPosY, setStartingPosY] = useState(SEGMENT_SIZE * -3)
  const [gameOver, setGameOver] = useState(false);
  const [foodPosition, setFoodPosition] = useState<Position | undefined>()

  const [snakeBody, setSnakeBody] = useState<Position[]>([
    {
      x: startingPosX,
      y: startingPosY
    }
  ])
  
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
  }, [canvasHeight, canvasWidth])

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
  }, [startingPosX, startingPosY])

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.code) {
      case "KeyW":
      case "ArrowUp":
        if (snakeDir !== Direction.DOWN) setSnakeDir(Direction.UP)
        break;
      case "KeyS":
      case "ArrowDown":
        if (snakeDir !== Direction.UP) setSnakeDir(Direction.DOWN)
        break;
      case "KeyA":
      case "ArrowLeft":
        if (snakeDir !== Direction.RIGHT) setSnakeDir(Direction.LEFT)
        break;
      case "KeyD":
      case "ArrowRight":
        if (snakeDir !== Direction.LEFT) setSnakeDir(Direction.RIGHT)
        break;
    }
  }

  const gameOverCheck = () => {
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

      if (head.x > canvas.offsetWidth || head.x < -SEGMENT_SIZE || head.y > canvas.offsetHeight || head.y < -SEGMENT_SIZE) {
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
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody })
          setFoodPosition(newFoodPos)
        }
        setSnakeBody(newSnakeBody);
        break;
      case Direction.DOWN:
        newSnake = moveDown(snakeBody);
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody })
          setFoodPosition(newFoodPos)
        }
        setSnakeBody(newSnakeBody);
        break;
      case Direction.LEFT:
        newSnake = moveLeft(snakeBody);
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody })
          setFoodPosition(newFoodPos)
        }
        setSnakeBody(newSnakeBody);
        break;
      case Direction.RIGHT:
        newSnake = moveRight(snakeBody)
        newSnakeBody = newSnake.newSnake;
        if (newSnake.didEat) {
          const newFoodPos = generateRandomFoodPos({ segmentSize: SEGMENT_SIZE, snakeCanvas: canvas, snakeBody })
          setFoodPosition(newFoodPos)
        }
        setSnakeBody(newSnakeBody);
        break;
    }
  }

  useEffect(() => {
    if(gameOver) console.log("game over!")
  }, [gameOver])

  useInterval(moveSnake, gameOver ? null : MOVEMENT_SPEED)

  return {
    snakeBody,
    handleOnKeyDown,
    foodPosition
  }
}

export default useGameLogic;
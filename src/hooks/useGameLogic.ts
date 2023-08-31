import { useState, useEffect } from "react";
import useInterval from "./useInterval";
import createSnakeMovement from "../components/SnakeGame/movement";
import { SEGMENT_SIZE } from "../components/SnakeGame/drawSnake";

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

const useGameLogic = () => {
  const [snakeDir, setSnakeDir] = useState<Direction>();
  const [startingPosX, setStartingPosX] = useState(SEGMENT_SIZE * -3)
  const [startingPosY, setStartingPosY] = useState(SEGMENT_SIZE * -3)

  const [snakeBody, setSnakeBody] = useState<Position[]>([
    {
      x: startingPosX,
      y: startingPosY
    }
  ])
  
  useEffect(() => {
    const canvas = document.getElementById("snakeCanvas")
    if (canvas) {
      setStartingPosX(Math.trunc(canvas.offsetWidth / 2));
      setStartingPosY(Math.trunc(canvas.offsetHeight / 2));
    }
  }, [])

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

  const { moveRight, moveLeft, moveUp, moveDown } = createSnakeMovement();
  const moveSnake = () => {
    switch (snakeDir) {
      case Direction.UP:
        setSnakeBody(moveUp(snakeBody));
        break;
      case Direction.DOWN:
        setSnakeBody(moveDown(snakeBody));
        break;
      case Direction.LEFT:
        setSnakeBody(moveLeft(snakeBody));
        break;
      case Direction.RIGHT:
        setSnakeBody(moveRight(snakeBody));
        break;
    }
  }

  useInterval(moveSnake, MOVEMENT_SPEED)

  return {
    snakeBody,
    handleOnKeyDown
  }
}

export default useGameLogic;
import { Position } from "../../hooks/useGameLogic";
import { SEGMENT_SIZE } from "./drawSnake";

const createSnakeMovement = (gridSize = SEGMENT_SIZE) => ({
  moveRight: (snakeBody: Position[]) => {
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        x: snakeBody[0].x + SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    newSnake.pop();
    return newSnake;
  },
  moveLeft: (snakeBody: Position[]) => {
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        x: snakeBody[0].x - SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    newSnake.pop();
    return newSnake;
  },
  moveUp: (snakeBody: Position[]) => {
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        y: snakeBody[0].y - SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    newSnake.pop();
    return newSnake;
  },
  moveDown: (snakeBody: Position[]) => {
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        y: snakeBody[0].y + SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    newSnake.pop();
    return newSnake;
  },
})

export default createSnakeMovement;
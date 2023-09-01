import { Position } from "../../hooks/useGameLogic";
import { SEGMENT_SIZE } from "./drawSnake";

const createSnakeMovement = (foodPosition: Position | undefined) => ({
  moveRight: (snakeBody: Position[]) => {
    let didEat = false;
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        x: snakeBody[0].x + SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    if (foodPosition) {
      if (newSnake[0].x !== foodPosition.x || newSnake[0].y !== foodPosition.y) {
        newSnake.pop();
      } else if (newSnake[0].x === foodPosition.x || newSnake[0].y === foodPosition.y) {
        didEat = true;
      }
    }
    return { newSnake, didEat };
  },
  moveLeft: (snakeBody: Position[]) => {
    let didEat = false;
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        x: snakeBody[0].x - SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    if (foodPosition) {
      if (newSnake[0].x !== foodPosition.x || newSnake[0].y !== foodPosition.y) {
        newSnake.pop();
      } else if (newSnake[0].x === foodPosition.x || newSnake[0].y === foodPosition.y) {
        didEat = true;
      }
    }
    return { newSnake, didEat };
  },
  moveUp: (snakeBody: Position[]) => {
    let didEat = false;
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        y: snakeBody[0].y - SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    if (foodPosition) {
      if (newSnake[0].x !== foodPosition.x || newSnake[0].y !== foodPosition.y) {
        newSnake.pop();
      } else if (newSnake[0].x === foodPosition.x || newSnake[0].y === foodPosition.y) {
        didEat = true;
      }
    }
    return { newSnake, didEat };
  },
  moveDown: (snakeBody: Position[]) => {
    let didEat = false;
    const newSnake: Position[] = [
      {
        ...snakeBody[0],
        y: snakeBody[0].y + SEGMENT_SIZE,
      }
    ]
    newSnake.push(...snakeBody);
    if (foodPosition) {
      if (newSnake[0].x !== foodPosition.x || newSnake[0].y !== foodPosition.y) {
        newSnake.pop();
      } else if (newSnake[0].x === foodPosition.x || newSnake[0].y === foodPosition.y) {
        didEat = true;
      }
    }
    return { newSnake, didEat };
  },
})

export default createSnakeMovement;
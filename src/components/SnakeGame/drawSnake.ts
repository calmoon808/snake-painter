import { Position } from "../../hooks/useGameLogic"

interface DrawArgs {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
  foodPosition?: Position;
}

export const SEGMENT_SIZE = 15;

export const drawSnake = ({ ctx, snakeBody, foodPosition }: DrawArgs) => {
  if (foodPosition) {
    ctx.fillStyle = "red";
    ctx.fillRect(foodPosition.x, foodPosition.y, SEGMENT_SIZE, SEGMENT_SIZE)
  }

  ctx.fillStyle = "black";
  snakeBody.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  })
}
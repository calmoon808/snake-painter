import { Position } from "../../hooks/useGameLogic"

interface DrawArgs {
  ctx: CanvasRenderingContext2D;
  snakeBody: Position[];
}

export const SEGMENT_SIZE = 15;

export const drawSnake = ({ ctx, snakeBody }: DrawArgs) => {
  ctx.fillStyle = "black"
  snakeBody.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
  })
}
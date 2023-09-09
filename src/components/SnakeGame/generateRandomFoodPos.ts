import { Position } from "../../hooks/useGameLogic";

interface GenerateRandomFoodPosArgs {
  segmentSize: number;
  snakeCanvas: HTMLElement | null;
  snakeBody: Position[];
}

const isFoodIntersecting = (snakeBody: Position[], newPos: Position) => {
  snakeBody.forEach((segment) => {
    if (newPos.x === segment.x && newPos.y === segment.y) {
      return true;
    }
  })
  return false;
}

const generateRandomFoodPos = ({ segmentSize, snakeCanvas, snakeBody }: GenerateRandomFoodPosArgs) => {
  if (!snakeCanvas) return;
  const newPos =  {
    x: Math.floor(Math.random() * ((snakeCanvas.offsetWidth - segmentSize) / segmentSize)) * segmentSize,
    y: Math.floor(Math.random() * ((snakeCanvas.offsetHeight - segmentSize) / segmentSize)) * segmentSize,
  }

  while (isFoodIntersecting(snakeBody, newPos)) {
    newPos.x = Math.floor(Math.random() * ((snakeCanvas.offsetWidth - segmentSize) / segmentSize)) * segmentSize;
    newPos.y = Math.floor(Math.random() * ((snakeCanvas.offsetHeight - segmentSize) / segmentSize)) * segmentSize;
  }

  return newPos;
}

export default generateRandomFoodPos;
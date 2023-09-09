import React, { useEffect } from "react";
import styles from "./SnakeCanvas.module.css";
import { Direction, Position } from "../../hooks/useGameLogic";

interface SnakeCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  snakeBody: Position[],
  handleOnKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void,
  foodPosition: Position | undefined,
  gameStart: boolean,
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>,
  gameOver: boolean,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  setSnakeDir: React.Dispatch<React.SetStateAction<Direction | undefined>>
}

const SnakeCanvas = (props: SnakeCanvasProps) => {
  const {
    canvasRef,
    handleOnKeyDown,
    gameStart,
    setGameStart,
    gameOver,
    setGameOver,
    setSnakeDir,
  } = props;

  useEffect(() => {
    if (gameStart) {
      if (canvasRef.current) canvasRef.current.focus(); // Set focus on canvas when the game starts
      if (!localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", "0")
      }
    }
  }, [gameStart]);

  const handleStartButtonClick = () => {
    setSnakeDir(Direction.RIGHT)
    setGameStart(true);
  }

  const handleGameOverButtonClick = () => {
    setGameStart(false);
    setGameOver(false);
  }

  return (
    <div 
      id="snakeCanvas" 
      className={styles.snakeCanvas} 
      tabIndex={-1}
      onKeyDown={handleOnKeyDown}
    >
      {!gameStart && <button
          className={styles.startButton}
          onClick={handleStartButtonClick}
        >
          START
        </button>}
      {gameOver && <button
        className={styles.startButton}
        onClick={handleGameOverButtonClick}
      >
        GAME OVER
      </button>}
      <canvas tabIndex={-1} ref={canvasRef} />
    </div>
  )
}

export default SnakeCanvas;
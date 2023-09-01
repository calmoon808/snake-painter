import React, { useState, useEffect, useRef } from "react";
import styles from "./SnakeCanvas.module.css";
import { drawSnake } from "./drawSnake";
import useCanvas from "../../hooks/useCanvas";
import useGameLogic from "../../hooks/useGameLogic";

const SnakeCanvas = () => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const { snakeBody, handleOnKeyDown, foodPosition } = useGameLogic({ canvasHeight, canvasWidth });

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawSnake({ ctx, snakeBody, foodPosition })
  }

  const canvasRef = useCanvas(draw, true, true)

  useEffect(() => {
    const handleCanvasSize = () => {
      const parentDiv = document.getElementById("snakeCanvas");
      if (canvasRef.current && parentDiv) {
        canvasRef.current.width = parentDiv.offsetWidth;
        setCanvasWidth(parentDiv.offsetWidth);
        canvasRef.current.height = parentDiv.offsetHeight;
        setCanvasHeight(parentDiv.offsetHeight);
      }
    };
    handleCanvasSize();
    window.addEventListener("resize", handleCanvasSize)
    
    return () => {
      window.removeEventListener("resize", handleCanvasSize)
    }
  }, [])

  return (
    <div 
      id="snakeCanvas" 
      className={styles.snakeCanvas} 
      tabIndex={-1}
      onKeyDown={handleOnKeyDown}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export default SnakeCanvas;
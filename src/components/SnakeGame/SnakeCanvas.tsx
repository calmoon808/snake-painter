import React, { useState, useEffect, useRef } from "react";
import styles from "./SnakeCanvas.module.css";
import { drawSnake } from "./drawSnake";
import useCanvas from "../../hooks/useCanvas";
import useGameLogic from "../../hooks/useGameLogic";

const SnakeCanvas = () => {
  const [snakePosX, setSnakePosX] = useState(-1);
  const [snakePosY, setSnakePosY] = useState(-1);
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snakeBody, handleOnKeyDown } = useGameLogic();

  const draw = (ctx: CanvasRenderingContext2D) => {
    drawSnake({ ctx, snakeBody })
  }

  const canvasRef = useCanvas(draw, true)

  // const draw = (ctx: CanvasRenderingContext2D) => {
  //   console.log("drawing");
  //   ctx.beginPath();
  //   ctx.arc(snakePosX, snakePosY, 5, 0, Math.PI * 2, false);
  //   ctx.fillStyle = "black";
  //   ctx.fill();
  //   ctx.closePath();
  // }

  useEffect(() => {
    const handleCanvasSize = () => {
      const parentDiv = document.getElementById("snakeCanvas");
      if (canvasRef.current && parentDiv) {
        canvasRef.current.width = parentDiv.offsetWidth;
        canvasRef.current.height = parentDiv.offsetHeight;
      }
    };
    handleCanvasSize();
    const canvas = canvasRef.current;
    if (canvas) {
      setSnakePosX(canvas.width / 2);
      setSnakePosY(canvas.height / 2);
    }
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
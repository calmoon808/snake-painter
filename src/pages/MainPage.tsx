import React, { useState, useEffect } from "react";
import PaintCanvas from "../components/PaintCanvas/PaintCanvas";
import SideMenu from "../components/SideMenu.jsx/SideMenu";
import SnakeCanvas from "../components/SnakeGame/SnakeCanvas";
import styles from "./MainPage.module.css";
import useGameLogic from "../hooks/useGameLogic";
import useCanvas from "../hooks/useCanvas";

const SEGMENT_SIZE = 15;

const MainPage = () => {
  const [paintColor, setPaintColor] = useState("#000000");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [brushSize, setBrushSize] = useState(1.5);
  const [playSnake, setPlaySnake] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const {
    snakeBody,
    handleOnKeyDown,
    foodPosition,
    gameStart,
    setGameStart,
    gameOver,
    setGameOver,
    setSnakeDir,
    score,
  } = useGameLogic({ canvasHeight, canvasWidth });

  const paint = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize, 0, Math.PI * 2, false);
    ctx.fillStyle = paintColor;
    ctx.fill();
    ctx.closePath();
  }

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (foodPosition) {
      ctx.fillStyle = "red";
      ctx.fillRect(foodPosition.x, foodPosition.y, SEGMENT_SIZE, SEGMENT_SIZE)
    }
  
    ctx.fillStyle = "black";
    snakeBody.forEach((segment) => {
      ctx.fillRect(segment.x, segment.y, SEGMENT_SIZE, SEGMENT_SIZE)
    })
  }

  let canvasRef = playSnake ? useCanvas(draw, true, true) : useCanvas(paint, isMouseDown, false);

  useEffect(() => {
    const handleCanvasSize = () => {
      const parentDiv = document.getElementById(playSnake ? "snakeCanvas" : "paintCanvas");
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
  }, [playSnake])

  const handleWindowMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setCoords({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);

  return (
    <div
      className={styles.MainPage}
      onMouseMove={(e) => handleWindowMouseMove(e)}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      {playSnake ?
        <SnakeCanvas
          canvasRef={canvasRef}
          snakeBody={snakeBody}
          handleOnKeyDown={handleOnKeyDown}
          foodPosition={foodPosition}
          gameStart={gameStart}
          setGameStart={setGameStart}
          gameOver={gameOver}
          setGameOver={setGameOver}
          setSnakeDir={setSnakeDir}
        /> :
        <PaintCanvas canvasRef={canvasRef} />
      }
      <SideMenu
        paintColor={paintColor}
        setPaintColor={setPaintColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        playSnake={playSnake}
        setPlaySnake={setPlaySnake}
        score={score}
      />
    </div>
  )
}

export default MainPage;
import React, { useState } from "react";
import PaintCanvas from "../components/PaintCanvas/PaintCanvas";
import SideMenu from "../components/SideMenu.jsx/SideMenu";
import styles from "./MainPage.module.css";

const MainPage = () => {
  const [paintColor, setPaintColor] = useState("#000000");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [coords, setCoords] = useState({x: 0, y: 0});
  const [brushSize, setBrushSize] = useState(1.5);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, brushSize, 0, Math.PI * 2, false);
    ctx.fillStyle = paintColor;
    ctx.fill();
    ctx.closePath();
  }

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
      <PaintCanvas draw={draw} isMouseDown={isMouseDown}/>
      <SideMenu
        paintColor={paintColor}
        setPaintColor={setPaintColor}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
      />
    </div>
  )
}

export default MainPage;
import React, { useState, useEffect } from "react";
import styles from "./BrushSizeIndicator.module.css";

interface Props {
  brushSize: number
  setBrushSize: React.Dispatch<React.SetStateAction<number>>,
}

const BrushSizeIndicator = (props: Props) => {
  const { brushSize } = props;

  useEffect(() => {
    drawBrush();
  }, [brushSize])

  const drawBrush = () => {
    const canvas = document.getElementById("size-indicator") as HTMLCanvasElement;
    if (!canvas) return;
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, Math.PI * 2, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }
    }
  }

  return (
    <div className={styles.container}>
      <canvas id="size-indicator" height="40" width="40" />
    </div>
  )
}

export default BrushSizeIndicator;
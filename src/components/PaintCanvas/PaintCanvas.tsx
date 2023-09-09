import React from "react";
import styles from "./PaintCanvas.module.css";

interface PaintCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>,
}

const PaintCanvas = (props: PaintCanvasProps) => {
  const { canvasRef } = props;

  return (
    <div id="paintCanvas" className={styles.paintCanvas}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default PaintCanvas;
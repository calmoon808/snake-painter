import React, { useEffect } from "react";
import styles from "./PaintCanvas.module.css";
import useCanvas from "../../hooks/useCanvas";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void
  isMouseDown: boolean,
}

const PaintCanvas = (props: Props) => {
  const { draw, isMouseDown } = props;
  const canvasRef = useCanvas(draw, isMouseDown);

  useEffect(() => {
    const handleCanvasSize = () => {
      const parentDiv = document.getElementById("paintCanvas");
      if (canvasRef.current && parentDiv) {
        canvasRef.current.width = parentDiv.offsetWidth;
        canvasRef.current.height = parentDiv.offsetHeight;
      }
    };
    handleCanvasSize();

    window.addEventListener("resize", handleCanvasSize)
    
    return () => {
      window.removeEventListener("resize", handleCanvasSize)
    }
  }, [])

  return (
    <div id="paintCanvas" className={styles.paintCanvas}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default PaintCanvas;
import React, { useRef, useEffect } from "react";

const useCanvas = (
  draw: (ctx: CanvasRenderingContext2D) => void,
  isMouseDown: boolean
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      let frameCount: number = 0;
      let animationFrameId: number;
      let x = 0;
  
      const render = () => {
        if (context) {
          draw(context);
        }
        animationFrameId = window.requestAnimationFrame(render);
      }
      
      if (isMouseDown) {
        render();
      }
  
      return () => {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [draw])

  
  return canvasRef;
}

export default useCanvas
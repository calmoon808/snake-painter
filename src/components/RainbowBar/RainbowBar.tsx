import React, { useState } from "react";
import styles from "./RainbowBar.module.css";
import { hexToRgb } from "../../utils";

const colors = [
  "ff0000",
  "ffa500",
  "ffff00",
  "008000",
  "0000FF",
  "800080"
]

interface Props {
  setBaseColor: React.Dispatch<React.SetStateAction<string>>
}

const RainbowBar = (props: Props) => {
  const { setBaseColor } = props;
  const [rainbowMouseCoords, setRainbowMouseCoords] = useState("");

  const handleRainbowMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.target) return;
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect();
    setRainbowMouseCoords(((e.clientX - rect.left) / rect.width).toFixed(2));
  }

  const interpolateColor = (colors: string[], xStr: string) => {
    // Ensure x is within the valid range
    const x = Math.max(0, Math.min(1, parseFloat(xStr)));

    // Determine the segment in the gradient
    const segmentCount = colors.length - 1;
    const segmentWidth = 1 / segmentCount;
    const segmentIndex = Math.floor(x / segmentWidth);
    const segmentX = (x - segmentIndex * segmentWidth) / segmentWidth;

    // Get the colors at the start and end of the segment, and convert to RGB
    const color1 = hexToRgb(colors[segmentIndex]);
    const color2 = hexToRgb(colors[segmentIndex + 1]);

    // Interpolate the RGB values
    const interpolatedColor = color1.map((c1, i) => {
      const c2 = color2[i];
      return Math.round((1 - segmentX) * c1 + segmentX * c2);
    });

    // Convert RGB values to hexadecimal
    const hexColor = interpolatedColor.map(c => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
    return hexColor;
  }

  const handleMouseDown = () => setBaseColor(interpolateColor(colors, rainbowMouseCoords));

  return (
    <div
      className={`${styles.rainbowBar}`}
      onMouseMove={(e) => handleRainbowMouseMove(e)}
      onMouseDown={handleMouseDown}
    >

    </div>
  )
}

export default RainbowBar;
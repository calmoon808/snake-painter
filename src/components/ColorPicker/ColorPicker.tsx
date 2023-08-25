import React, { useState } from "react";
import styles from "./ColorPicker.module.css";
import { hexToRgb } from "../../utils";

interface Props {
  setPaintColor: React.Dispatch<React.SetStateAction<string>>,
  baseColor: string,
}

const ColorPicker = (props: Props) => {
  const { setPaintColor, baseColor } = props;
  const [coords, setCoords] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.target) return;
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect();
    setCoords(((e.clientX - rect.left) / rect.width).toFixed(2));
  }

  const pickHex = (color1: string, color2: string, xStr: string) => {
    const x = parseFloat(xStr)
    const color1Rgb = hexToRgb(color1);
    const color2Rgb = hexToRgb(color2);
    let newColorRgb = "";
  
    for (let i = 0; i < color1Rgb.length; i++) {
      let newColor = (Math.trunc((1 - x) * color1Rgb[i] + x * color2Rgb[i])).toString(16);
      if (newColor.length === 1) {
        newColor = "0" + newColor;
      }
      newColorRgb += newColor;
    }
  
    return `#${newColorRgb}`;
  }

  const handleMouseDown = () => setPaintColor(pickHex("FFFFFF", baseColor, coords));

  return (
    <div
      className={styles.colorPicker}
      style={{ backgroundImage: `linear-gradient(to right, white, #${baseColor})` }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseDown={handleMouseDown}
    />
  )
}

export default ColorPicker;
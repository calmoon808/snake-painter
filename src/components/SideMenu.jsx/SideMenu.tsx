import React, { useState } from "react";
import styles from "./SideMenu.module.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import RainbowBar from "../RainbowBar/RainbowBar";
import SizePicker from "../SizePicker/SizePicker";
import BrushSizeIndicator from "../BrushSizeIndicator/BrushSizeIndicator";

interface Props {
  paintColor: string,
  setPaintColor: React.Dispatch<React.SetStateAction<string>>,
  brushSize: number,
  setBrushSize: React.Dispatch<React.SetStateAction<number>>
}

const SideMenu = (props: Props) => {
  const { paintColor, setPaintColor, brushSize, setBrushSize } = props;
  const [baseColor, setBaseColor] = useState("000000");
  const [prevBrushColor, setPrevBrushColor] = useState("");

  const handleBrushClick = () => {
    setPaintColor(prevBrushColor)
  };

  const handleEraserClick = () => {
    if (paintColor !== "#ffffff") {
      setPrevBrushColor(paintColor);
    }
    setPaintColor("#ffffff");
  };

  return (
    <div className={styles.sideMenu}>
      <div className={styles.siteName}>
        PIXEL PAINTER
      </div>
      <ColorPicker setPaintColor={props.setPaintColor} baseColor={baseColor} />
      <div className={styles.row}>
        <div className={`${styles.chosenColor}`} style={{ backgroundColor: `${paintColor}` }} />
        <RainbowBar setBaseColor={setBaseColor} />
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={handleBrushClick}>
          <img src="/icons/paintbrush.png" />
        </button>
        <button className={styles.button} onClick={handleEraserClick}>
          <img src="/icons/eraser.png" />
        </button>
        <button className={styles.button}>
          <img src="/icons/snake.png" />
        </button>
      </div>
      <div className={styles.row}>
        <BrushSizeIndicator brushSize={brushSize} setBrushSize={setBrushSize} />
        <SizePicker setBrushSize={setBrushSize} />
      </div>
    </div>
  )
}

export default SideMenu;
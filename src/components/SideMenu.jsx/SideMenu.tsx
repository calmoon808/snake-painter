import React, { useState } from "react";
import styles from "./SideMenu.module.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import RainbowBar from "../RainbowBar/RainbowBar";
import SizePicker from "../SizePicker/SizePicker";
import BrushSizeIndicator from "../BrushSizeIndicator/BrushSizeIndicator";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

interface Props {
  paintColor: string,
  setPaintColor: React.Dispatch<React.SetStateAction<string>>,
  brushSize: number,
  setBrushSize: React.Dispatch<React.SetStateAction<number>>,
  playSnake: boolean,
  setPlaySnake: React.Dispatch<React.SetStateAction<boolean>>,
  score: number,
}

const SideMenu = (props: Props) => {
  const { paintColor, setPaintColor, brushSize, setBrushSize, playSnake, setPlaySnake, score } = props;
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

  const handleSnakeClick = () => {
    setPlaySnake(!playSnake)
  }

  return (
    <div className={styles.sideMenu}>
      <div className={styles.siteName}>
        SNAKE PAINTER
      </div>
      {playSnake && <ScoreBoard score={score} />}
      <ColorPicker setPaintColor={props.setPaintColor} baseColor={baseColor} />
      <div className={styles.row}>
        <div className={`${styles.chosenColor}`} style={{ backgroundColor: `${paintColor}` }} />
        <RainbowBar setBaseColor={setBaseColor} />
      </div>
      <div className={styles.row}>
        <button className={styles.button} onClick={handleBrushClick}>
          <img src={require("../../assets/icons/paintbrush.png")} />
        </button>
        <button className={styles.button} onClick={handleEraserClick}>
          <img src={require("../../assets/icons/eraser.png")} />
        </button>
        <button className={styles.button} onClick={handleSnakeClick}>
          <img src={require("../../assets/icons/snake.png")} />
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
import React, { useState } from "react";
import styles from "./SideMenu.module.css";
import ColorPicker from "../ColorPicker/ColorPicker";
import RainbowBar from "../RainbowBar/RainbowBar";

interface Props {
  setPaintColor: React.Dispatch<React.SetStateAction<string>>,
  paintColor: string
}

const SideMenu = (props: Props) => {
  const [baseColor, setBaseColor] = useState("000000");

  return (
    <div className={styles.sideMenu}>
      <ColorPicker setPaintColor={props.setPaintColor} baseColor={baseColor} />
      <div className={styles.colorRow}>
        <div className={`${styles.chosenColor}`} style={{ backgroundColor: `${props.paintColor}` }} />
        <RainbowBar setBaseColor={setBaseColor} />
      </div>
    </div>
  )
}

export default SideMenu;
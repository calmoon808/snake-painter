import React, { useState, useEffect } from "react";
import styles from "./SizePicker.module.css";

interface Props {
  setBrushSize: React.Dispatch<React.SetStateAction<number>>,
}

const SizePicker = (props: Props) => {
  const { setBrushSize } = props;
  const [sliderXPos, setSliderXPos] = useState(45);
  const [sliderXPosPercentage, setSliderXPosPercentage] = useState(0);

  useEffect(() => {
    const sizePickerElRect = document.getElementById("size-picker")?.getBoundingClientRect();
    if (sizePickerElRect) {
      setSliderXPosPercentage(parseFloat((sliderXPos / sizePickerElRect.width).toFixed(2)))
    }
  }, [])

  useEffect(() => {
    interpolateSize(sliderXPosPercentage)
  }, [sliderXPosPercentage])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!e.target) return;
    const node = e.target as HTMLElement
    const rect = node.getBoundingClientRect();
    const xPos = Math.trunc(e.clientX - rect.left)
    setSliderXPos(xPos);
    setSliderXPosPercentage(parseFloat((xPos / rect.width).toFixed(2)));
  }

  const interpolateSize = (xPercentage: number) => {
    let x = Math.max(0, xPercentage);

    const segmentCount = 37;
    const segmentWidth = 1 / segmentCount;
    const segmentIndex = Math.floor(x / segmentWidth);
    let newBrushSize = 1.5;

    for (let i = 0; i < segmentIndex; i++) {
      newBrushSize += 0.5;
    }

    setBrushSize(newBrushSize);
  } 

  return (
    <div className={styles.container} onClick={(e) => handleClick(e)}>
      <div
        id="size-picker"
        className={styles.sizePicker}
      >
        <div
          className={styles.slider}
          style={{ left: `${sliderXPos}px` }}
        />
      </div>
    </div>
  )
}

export default SizePicker;
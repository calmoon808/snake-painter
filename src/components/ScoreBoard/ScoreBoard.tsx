import React from "react";
import styles from "./ScoreBoard.module.css"

interface ScoreBoardArgs {
  score: number;
}

const ScoreBoard = (props: ScoreBoardArgs) => {
  const { score } = props;

  const highScore = localStorage.getItem("highScore");

  return (
    <div className={styles.scoreboard}>
      <div>
        <h1>Score</h1>
        <span className={styles.score}>
          {score}
        </span>
      </div>
      <div className={styles.hiScore}>
        <h1>Best</h1>
        <span className={styles.score}>
          {highScore ? highScore : 0}
        </span>
      </div>
    </div>
  )
}

export default ScoreBoard
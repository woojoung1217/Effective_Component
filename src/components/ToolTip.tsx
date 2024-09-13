import React from "react";
import styles from "./ToolTip.module.scss";
interface Props {
  title: string;
  tooltipItem: string;
  triggerEvent?: "hover" | "click"; // 동작 방식 유연성 추가
  position?: "top" | "bottom" | "left" | "right"; // 위치 지정 가능성 추가
}

const ToolTip = ({ title, tooltipItem, position = "top" }: Props) => {
  return (
    <div className={styles.tooltipContainer}>
      <button className={styles.tooltipTrigger}>{title}</button>
      <div className={`${styles.tooltipContent} ${styles[position]}`}>{tooltipItem}</div>
    </div>
  );
};

export default ToolTip;

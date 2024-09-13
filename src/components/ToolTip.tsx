import React from "react";
import styles from "./ToolTip.module.scss";

interface Props {
  title: string;
  tooltipItem: string;
}

const ToolTip = ({ title, tooltipItem }: Props) => {
  return (
    <div className={styles.tooltipContainer}>
      <button className={styles.tooltipTrigger}>{title}</button>
      <div className={styles.tooltipContent}>{tooltipItem}</div>
    </div>
  );
};

export default ToolTip;

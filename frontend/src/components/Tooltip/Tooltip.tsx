import React from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  message: string;
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ message, onClose }) => {
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipContent}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Tooltip;

import React, { useState } from "react";
import styles from "./KeyRatios.module.css";

interface KeyRatiosProps {
  ratios: { [key: string]: number | string };
}

const KeyRatios: React.FC<KeyRatiosProps> = ({ ratios }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className={styles.keyRatios}>
      <div className={styles.header}>
        <h2>
          Key Ratios
          <button onClick={toggleDescription} className={styles.infoButton}>
            ?
          </button>
        </h2>
      </div>
      {showDescription && (
        <p className={styles.description}>
          * Key ratios are financial metrics that provide insights into a
          company's performance and financial health. These ratios are used by
          analysts and investors to evaluate various aspects of a company's
          operations, including liquidity, profitability, and solvency.
        </p>
      )}
      <table>
        <tbody>
          {Object.entries(ratios).map(([key, value]) => (
            <tr key={key}>
              <td className={styles.key}>{key}</td>
              <td className={styles.value}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyRatios;

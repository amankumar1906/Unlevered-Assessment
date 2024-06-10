import React, { useState } from "react";
import styles from "./AnalystEstimates.module.css";

interface AnalystEstimatesProps {
  estimates: { bank: string; estimate: number }[];
}

const AnalystEstimates: React.FC<AnalystEstimatesProps> = ({ estimates }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className={styles.analystEstimates}>
      <div className={styles.header}>
        <h2>
          Analyst Estimates
          <button onClick={toggleDescription} className={styles.infoButton}>
            ?
          </button>
        </h2>
      </div>
      {showDescription && (
        <p className={styles.description}>
          Analyst estimates are predictions made by financial analysts about a
          company's future financial performance. These estimates can include
          projections for earnings, revenue, and other key financial metrics,
          and are used by investors to help make informed decisions about buying
          or selling stocks.
        </p>
      )}
      <table>
        <tbody>
          {estimates.map((estimate) => (
            <tr key={estimate.bank}>
              <td className={styles.bank}>{estimate.bank}</td>
              <td className={styles.estimate}>{estimate.estimate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalystEstimates;

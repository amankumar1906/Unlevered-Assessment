import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} UnLevered. All Rights Reserved.</p>
      <p>
        Disclaimer: The information provided on this website is for
        informational purposes only and is not intended as financial advice.
      </p>
    </footer>
  );
};

export default Footer;

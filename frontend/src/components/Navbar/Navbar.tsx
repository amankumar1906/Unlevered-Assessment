import React from "react";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>Unlevered</div>
      <ul className={styles.navbarItems}>
        <li className={styles.navbarItem}>Home</li>
        <li className={styles.navbarItem}>About</li>
        <li className={styles.navbarItem}>Contact</li>
        <li className={styles.navbarItem}>Services</li>
        <li className={styles.navbarItem}>Products</li>
        <li className={styles.navbarItem}>Pricing</li>
        <li className={styles.navbarItem}>Blog</li>
        <li className={styles.navbarItem}>Careers</li>
      </ul>
    </nav>
  );
};

export default Navbar;

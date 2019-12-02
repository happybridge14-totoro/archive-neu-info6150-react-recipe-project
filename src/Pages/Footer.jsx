import React, {useContext} from 'react'
import styles from "./Footer.module.css";
import {PopupContext, SHOW} from "../context/showPopupContext";

const Footer = (props) => {
  const showPopup = useContext(PopupContext);
    return (
      <footer className={`${styles.footer} ${showPopup===SHOW ? styles.showPopup : ""}`}>
        <ul className={styles.container}>
          <li>
            <a className={`clickable ${styles.footerBtn}`} href="/about">About</a>
          </li>
          <li>
            <a className={`clickable ${styles.footerBtn}`} href="/contact">Contact Us</a>
          </li>
          <li>
            <span>© 2019 INFO6150-Team3</span>
          </li>
        </ul>
      </footer>
    )
}

export default Footer

import React from 'react'
import styles from "./Footer.module.css";

const Footer = (props) => {
    return (
      <footer>
        <ul className={styles.container}>
          <ui>
            <a className={`clickable ${styles.footerBtn}`} href="/about">About</a>
          </ui>
          <ui>
            <a className={`clickable ${styles.footerBtn}`} href="/contact">Contact Us</a>
          </ui>
          <ui>
            <span>© 2019 INFO6150-Team3</span>
          </ui>
        </ul>
      </footer>
    )
}

export default Footer

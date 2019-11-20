import React from 'react'
import styles from './About.module.css';

const About = () => {
    return (
        <section className={styles.about}>
          <h1>About</h1>
          <h2>About the website</h2>
          <img src="/images/logo1.png" alt="logo"/>
          <h2>About us</h2>
          <p>We are Team 3!</p>
          <a href="/contact" className="clickable">Contact us</a>
        </section>
    )
}

export default About

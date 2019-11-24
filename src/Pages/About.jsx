import React from 'react'
import styles from './About.module.css';
import NavigationBar from "../Widgets/NavigationBar";

const navbarPosition = [true, "about"];

const About = () => {
    return (
        <div className={styles.about}>
          <NavigationBar positions={navbarPosition}/>
          <section>
            <h1>About the website</h1>
            <img src="/images/logo1.png" alt="logo"/>
            <h1>About us</h1>
            <p>We are Team 3!</p>
            <a href="/contact" className="clickable">Contact us</a>
          </section>
        </div>
    )
}

export default About

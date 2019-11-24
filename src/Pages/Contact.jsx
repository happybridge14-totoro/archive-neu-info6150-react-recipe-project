import React from 'react'
import styles from './Contact.module.css';
import {getContractInfo} from '../Proxy/Data.js';
import NavigationBar from "../Widgets/NavigationBar";

const navbarPosition = [true, "contact"];
const contactInfo = getContractInfo();

const createNodes = () => {
  let result = [];
  contactInfo.forEach((v, i) => {
    result.push(<h2 key={2*i}>{v.name}</h2>);
    result.push(<address key={2*i+1}>
      <a href={`mailto:${v.email}`} className={styles.mailto}>{v.email}</a>
    </address>);
  });
  return result;
}
const Contact = () => {
    return (
        <div className={styles.contact}>
          <NavigationBar positions={navbarPosition}/>
          <div className={styles.container}>
            <section className={styles.leftContainer}>
              <h1>
                Contact Us
              </h1>
              {createNodes()}
            </section>
            <section className={styles.rightontainer}>
              <h1>
                Leave a message
              </h1>
              <form action="submit">
                <div className={styles.formContainer}>
                  <label className={styles.label} htmlFor="name">Name</label>
                  <input className={styles.input} type="text" name="name" id="name"/>
                  <label className={styles.label} htmlFor="email">E-mail</label>
                  <input className={styles.input} type="text" name="email" id="email"/>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea className={styles.textArea} id="message" name="message" rows="5"></textarea>
                </div>
              </form>
            </section>
          </div>
        </div>
    )
}

export default Contact

import React from 'react'
import styles from './Contact.module.css';
import {getContractInfo} from '../Proxy/Data.js';

const contactInfo = getContractInfo();

const createNodes = () => {
  let result = [];
  contactInfo.forEach((v, i) => {
    result.push(<h2 key={2*i}>{v.name}</h2>);
    result.push(<address key={2*i+1}>
      <a href={`mailto:${v.email}`}>{v.email}</a>
    </address>);
  });
  return result;
}
const Contact = () => {
    return (
        <div className={styles.contact}>
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
                </div>
              </form>
            </section>
        </div>
    )
}

export default Contact

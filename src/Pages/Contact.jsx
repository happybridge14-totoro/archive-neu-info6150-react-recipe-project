import React from 'react'
import styles from './About.module.css';
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
const About = () => {
    return (
        <div className={styles.contact}>
          <section className={styles.container}>
            <h1>
              Contact Us:
            </h1>
            {createNodes()}
            </section>
        </div>
    )
}

export default About

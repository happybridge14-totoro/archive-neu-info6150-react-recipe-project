import React from 'react'
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.contact}>
          <section className={styles.container}>
            <h1>
              Contact Us:
            </h1>
            <h2>
              Yiji Huang:
            </h2>
            <address>
              <a href="mailto:huang.yiji@husky.neu.edu">huang.yiji@husky.neu.edu</a>
            </address>
            <h2>
              Yiyi Zhou:
            </h2>
            <address>
              <a href="mailto:zhou.yiyi@husky.neu.edu">zhou.yiyi@husky.neu.edu</a>
            </address>
            <h2>
              Yuwei Zhang:
            </h2>
            <address>
              <a href="mailto:zhang.yuwei1@husky.neu.edu">zhang.yuwei1@husky.neu.edu</a>
            </address>
            <h2>
              Zhong Zheng:
            </h2>
            <address>
              <a href="mailto:zheng.zho@husky.neu.edu">zheng.zho@husky.neu.edu</a>
            </address>
          </section>
        </div>
    )
}

export default About

import React,{ Component } from 'react'
import styles from "./AllCategories.module.css"
import NavigationBar from "../Widgets/NavigationBar"
import {getCategories, getItem} from "../Proxy/Data"

const positions= [true,true]
const AllCategories= () => {
    return (
      <div className={styles.allCategories}>
        <NavigationBar positions={positions}/>
        <div className={styles.container}>
          <h2 className={styles.header2}>Browse All Categories</h2>
        </div>
        <div className={styles.box}>
          <div className={styles.subbox}>
            <img className={styles.picbox} src="" alt="" />
            <a className={` clickable ${styles.title}`} href="/">NAME</a>
            <ul className={styles.list}>
              <li>
                <a className={`clickable ${styles.subtitle}`} href="/">Pineapple – Topped New York Cheesecake</a>
              </li>
              <li>
                <a className={`clickable ${styles.subtitle}`} href="/">Chocolate Chip Ice Cream Sandwich</a>
              </li>
              <li>
                <a className={`clickable ${styles.subtitle}`} href="/">Deep-Dish Layered Banana Pudding</a>
              </li>
              <li>
                <a className={`clickable ${styles.subtitle}`} href="/">Chocolate Chip Cookies</a>
              </li>
              <li>
                <a className={`clickable ${styles.subtitle}`} href="/">Chocolate Brownies</a>
              </li>
            </ul>
          </div>  
        </div>
     </div>
    )
}

export default AllCategories;

import React from 'react'
import styles from "./AllCategories.module.css"
import NavigationBar from "../Widgets/NavigationBar"
const positions = [true, true];
const AllCategories= () => {
    return (
      <div className={styles.allCategories}>
        <NavigationBar positions={positions}/>
        <div className={styles.container}>
          <h2 className={styles.header2}>Browse All Categories</h2>
        </div>
        <div className={styles.box}>
          <div className={styles.subbox}>
            <img className={styles.picbox} src="https://image.freepik.com/free-vector/delicious-tasty-breakfast-cartoon_24640-53956.jpg" alt="Breakfast" />
            <a className={` clickable ${styles.title}`} href="/">Breakfast</a>
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
          <div className={styles.subbox}>
            <img className={styles.picbox} src="https://cdn.ruled.me/wp-content/uploads/2014/09/keto-diet-low-carb-cheat-sheet-desserts.png" alt="Dessert" />
            <a className={` clickable ${styles.title}`} href="/">Dessert</a>
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
          <div className={styles.subbox}>
            <img className={styles.picbox} src="https://www.nicepng.com/png/full/8-87107_hand-drawn-cartoon-new-year-s-rice-food.png" alt="Dinner" />  
            <a className={`clickable ${styles.title}`} href="/">Dinner</a>
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

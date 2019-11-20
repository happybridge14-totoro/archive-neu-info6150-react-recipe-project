import React from 'react'
import Style from "./AllCategories.module.css"
import NavigationBar from "../Widgets/NavigationBar"
const positions = [true, true];
const AllCategories= () => {
    return (
      <div className={Style.allCategories}>
        <NavigationBar positions={positions}/>
        <div className={Style.container}>
          <h2 className={Style.header2}>Browse All Categories</h2>
        </div>
        <div className={Style.box}>
          <div className={Style.subbox}>
            <img className={Style.picbox} src="https://image.freepik.com/free-vector/delicious-tasty-breakfast-cartoon_24640-53956.jpg" alt="Breakfast" />
            <h3 className={` clickable ${Style.title}`} href="/">Breakfast</h3>
            <ul className={Style.list}>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Pineapple – Topped New York Cheesecake</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Ice Cream Sandwich</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Deep-Dish Layered Banana Pudding</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Cookies</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Brownies</a>
              </li>
            </ul>
          </div>
          <div className={Style.subbox}>
            <img className={Style.picbox} src="http://4designer.t7yb.net/files/20140221/Vector-material-of-delicious-cartoon-dessert-pastries-56610.jpg" alt="Dessert" />
            <h3 className={` clickable ${Style.title}`} href="/">Dessert</h3>
            <ul className={Style.list}>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Pineapple – Topped New York Cheesecake</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Ice Cream Sandwich</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Deep-Dish Layered Banana Pudding</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Cookies</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Brownies</a>
              </li>
            </ul>
          </div>
          <div className={Style.subbox}>
            <img className={Style.picbox} src="https://www.nicepng.com/png/full/8-87107_hand-drawn-cartoon-new-year-s-rice-food.png" alt="Dinner" />  
            <h3 className={` clickable ${Style.title}`} href="/">Dinner</h3>
            <ul className={Style.list}>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Pineapple – Topped New York Cheesecake</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Ice Cream Sandwich</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Deep-Dish Layered Banana Pudding</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Chip Cookies</a>
              </li>
              <li>
                <a className={`clickable ${Style.subtitle}`} href="/">Chocolate Brownies</a>
              </li>
            </ul>
          </div>
        </div>
     </div>
    )
}

export default AllCategories;

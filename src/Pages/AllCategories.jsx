import React from 'react'
import {ulid} from 'ulid';
import styles from "./AllCategories.module.css"
import NavigationBar from "../Widgets/NavigationBar"
import {getCategories, getItemsByCategoryIds} from "../Proxy/Data"

const positions= [true,true]
const allCategoriesObj = getCategories();
const allCategoriesItem = getItemsByCategoryIds(allCategoriesObj.map(v=>{return v.id}));

const getEachCategories = () =>{
  let result = [];
      
  allCategoriesObj.forEach((v,i) => {
      let eachCategoriesItems = [];
      allCategoriesItem[i].forEach((v) => {
        eachCategoriesItems.push(
          <div key={ulid()}> 
            <a className={` clickable ${styles.subtitle}`} href={`/detail/${v.id}`}>{v.title}</a>
        </div>)
      }
      )
        result.push(
          <div key={ulid()}>
            <div key={ulid()}>
              <img className={styles.picbox} src={v.imageURL} alt={v.name}/>
              <a className={` clickable ${styles.title}`} href={`/Category/${v.id}`}>{v.name}</a> 
              </div>
            {eachCategoriesItems}
          </div>)
    }
    )
    return result;
}


const AllCategories= () => {
    return (
      <div className={styles.allCategories}>
        <NavigationBar positions={positions}/>
        <div className={styles.container}>
          <h2 className={styles.header2}>Browse All Categories</h2>
        </div>
        <div className={styles.box}>
            {getEachCategories()}
        </div>
     </div>
    )
}

export default AllCategories;

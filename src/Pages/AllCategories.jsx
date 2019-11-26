import React from 'react'
import styles from "./AllCategories.module.css"
import NavigationBar from "../Widgets/NavigationBar"
import {getCategories, getItem} from "../Proxy/Data"

const positions= [true,true]
let allCategoriesObj = getCategories();
let allCategoriesItem = getItem();

const getCategoriesPic = () =>{
  let result = [];
  let index = 0;
  let allCategories = allCategoriesObj;
    allCategories.forEach((v) => {
      result.push(<div className={styles.box} key={index++}>
          <img className={styles.picbox} src={v.imageURL} alt={v.name}/>
      </div>)
    }
    )
    return result;
}

const getCategoriesName = () =>{
  let result = [];
  let index = 0;
  let allCategories = allCategoriesObj;
    allCategories.forEach((v) => {
      result.push(<div key={index++}>
          <a className={` clickable ${styles.title}`} href={`/Category/${v.id}`}>{v.name}</a>
      </div>)
    }
    )
    return result;
} 
const getItemsBreakfast = () =>{
  let result = [];
  let index = 0;
  let allItems = allCategoriesItem;
    allItems.forEach((v) => {
      result.push(<div key={index++} >
          <a className={` clickable ${styles.subtitle}`} href={`/detail/${v.id}`}>{v.title}</a>
      </div>)
    }
    )
    return result.slice(5,10);
} 
const getItemsDinner = () =>{
  let result = [];
  let index = 0;
  let allItems = allCategoriesItem;
    allItems.forEach((v) => {
      result.push(<div key={index++} >
          <a className={` clickable ${styles.subtitle}`} href={`/detail/${v.id}`}>{v.title}</a>
      </div>)
    }
    )
    return result.slice(10,15);
} 

const getItemsDessert = () =>{
  let result = [];
  let index = 0;
  let allItems = allCategoriesItem;
    allItems.forEach((v) => {
      result.push(<div key={index++} >
          <a className={` clickable ${styles.subtitle}`} href={`/detail/${v.id}`}>{v.title}</a>
      </div>)
    }
    )
    return result.slice(0,5);
} 

const AllCategories= () => {
    return (
      <div className={styles.allCategories}>
        <NavigationBar positions={positions}/>
        <div className={styles.container}>
          <h2 className={styles.header2}>Browse All Categories</h2>
        </div>
        <div>
          <div>
            <div className={styles.box}>
              {getCategoriesPic()}
            </div>
            <div className={styles.box}>
              {getCategoriesName()}
            </div>
            <div className={styles.box}>
              <div>{getItemsBreakfast()}</div>
              <div>{getItemsDinner()}</div>
              <div>{getItemsDessert()}</div>
            </div>
          </div>  
        </div>
     </div>
    )
}

export default AllCategories;

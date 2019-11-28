import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import items from "../data/items.json";
import NavigationBar from "../Widgets/NavigationBar"
        // <items = {Object.values(items)}>

export default class Category extends Component {
  constructor(props) {
    super(props);
    let detail = getItemById(this.props.id);
    this.state = {
      detail: detail
    };
    this.navbarPosition = [true, true, detail.categoryId, detail.id];
  }

  render() {
    if (this.state.detail === null) {
      window.location.replace('/404');
      return;
    }
    return (
      <article className = {styles.container}>
        <NavigationBar positions={this.navbarPosition}/>
        <div className = {styles.topleft}>
        <h1 >{this.state.detail.title}</h1>
        <h2>ratings: 4.6</h2>
        </div>

        <div className = {styles.low}>
        <p className ={styles.sectionTitle}> Ingredients: </p>
        {items[0].ingredients.map((val,index) =>{
          return <li key = {index}> {val} </li>
        })}
        <p className ={styles.sectionTitle}>Directions: </p>
        {items[0].directions.map((val,index) =>{
          return <ol>{index+1} : {val} </ol>
        })}
        </div>
      </article>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};

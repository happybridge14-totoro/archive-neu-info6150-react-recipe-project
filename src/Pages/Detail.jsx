import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import items from "../data/items.json";
import ReactPlayer from "react-player";

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: getItemById(this.props.id)
    };
  }

  render() {
    if (this.state.detail === null) {
      window.location.href = '/error';
      return;
    }
    return (
      <article className = {styles.container}>
        <div className = {styles.topleft}>
          <h1 >{this.state.detail.title}</h1>
          <h2>Rating: {this.state.detail.rating}</h2>
          <h2>Time: {this.state.detail.time}</h2>
        </div>

        <div > 
          <ReactPlayer
            url = {this.state.detail.videoURL}
            />
        </div>

        <div className = {styles.ingredients}>
          <p className ={styles.sectionTitle}> Ingredients: </p>
          {this.state.detail.ingredients.map((val,index) =>{
            return <li key = {index}> {val} </li>
          })}
        </div>

        <div className = {styles.directions}>
          <p className ={styles.sectionTitle}> Directions: </p>
          {this.state.detail.directions.map((val,index) =>{
            return <ol> {index+1} : {val} </ol>
          })}
        </div>

      </article>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};

import React, { Component } from "react";
import {ulid} from 'ulid';
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import ReactPlayer from "react-player";
import NavigationBar from "../Widgets/NavigationBar"
        // <items = {Object.values(items)}>

export default class Detail extends Component {
  constructor(props) {
    super(props);
    let detail = getItemById(this.props.id);
    this.state = {
      detail: detail
    };
    this.navbarPosition = [true, detail.categoryId, detail.id];
  }

  render() {
    if (this.state.detail === null) {
      window.location.replace('/404');
      return;
    }
    return (
      <article className = {styles.wholePage}>
        <NavigationBar positions={this.navbarPosition}/>
        <section className = {styles.container}>
            <div className = {styles.topleft}>
              <h1 >{this.state.detail.title}</h1>
              <h2>Rating: {this.state.detail.rating}</h2>
              <h2>Time: {this.state.detail.time}</h2>
            </div>
            
            {this.state.detail.videoURL !==""&&
            <div > 
              <ReactPlayer 
                className = {styles.videoWrapper}

                url = {this.state.detail.videoURL}
                alt = {this.state.detail.shortName} dish video
                />
            </div>}

            {this.state.detail.videoURL ==""&&
            <div > 
              <img
                className = {styles.imageWrapper}
                src = {this.state.detail.imageURL}
                alt = {this.state.detail.shortName} dish image
                />
            </div>}


            <div className = {styles.ingredients}>
              <p className ={styles.sectionTitle}> Ingredients: </p>
              <ul> 
              {this.state.detail.ingredients.map((val,index) =>{
                return <li key={ulid()}> {val} </li>
              })}
              </ul>
            </div>

            <div className = {styles.directions}>
              <p className ={styles.sectionTitle}> Directions: </p>
              <ol>
              {this.state.detail.directions.map((val,index) =>{
                return <li key={ulid()}> {val} </li>
              })}
              </ol>
            </div>
        </ section>

      </article>
    );
  }
}

Detail.propTypes = {
  id: PropTypes.string.isRequired
};

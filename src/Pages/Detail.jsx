import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import items from "../data/items.json";
import ReactPlayer from "react-player";
import NavigationBar from "../Widgets/NavigationBar"
////////////TO ADD////////////////////////
import EVENT from "../Proxy/Event";
import RatingStar from "../Widgets/RatingStar";
import {getStatus, rateIt, getRating} from "../Proxy/UserData";
/////////////////////////////////////////
        // <items = {Object.values(items)}>

export default class Category extends Component {
  constructor(props) {
    super(props);
    let detail = getItemById(this.props.id);
    this.state = {
////////////TO ADD////////////////////////
      user: getStatus(),
      userRating: "0",
/////////////////////////////////////////
      detail: detail
    };
    this.navbarPosition = [true, detail.categoryId, detail.id];
  }
///////////TO ADD////////////////////////
  signoutHandler = (e) => {
    this.setState({user: null});
  }
  rateItHandler = async (value) => {
    const ret = await rateIt(this.props.id, value);
    if (ret) {
      this.setState({userRating: ret.toString()});
    }
  }
  async componentDidMount() {
    if (this.state.user) {
      const rating = await getRating(this.props.id);
      this.setState({userRating: rating.toString()});
    }
    window.addEventListener(EVENT.SIGN_OUT, this.signoutHandler);
  }
  componentWillUnmount() {
    window.removeEventListener(EVENT.SIGN_OUT, this.signoutHandler);
  }
/////////////////////////////////////////


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
          <h2>Rating: {this.state.detail.rating}</h2>
          {/* ************TO ADD*************** */}
          <section>
            <span>Your rating:  </span>
            {this.state.user &&<RatingStar score={this.state.userRating} callBack={this.rateItHandler}/>}
            {!this.state.user && <a className={styles.clickable} href="/login">Login to rate me!</a>}
          </section>
          {/******************************/}
          <h3>Time: {this.state.detail.time}</h3>
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

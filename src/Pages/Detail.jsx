import React, { Component } from "react";
import {ulid} from 'ulid';
import PropTypes from 'prop-types';
import {getItemById} from "../Proxy/Data";
import styles from "./Detail.module.css";
import NavigationBar from "../Widgets/NavigationBar"
import EVENT from "../Proxy/Event";
import RatingStar from "../Widgets/RatingStar";
import {getStatus, rateIt, getRating} from "../Proxy/UserData";
import Video from "../Widgets/Video";
// import ReactPlayer from "react-player";


export default class Detail extends Component {
  constructor(props) {
    super(props);
    let detail = getItemById(this.props.id);
    this.state = {
      user: getStatus(),
      userRating: "0",
      detail: detail
    };
    if (detail !== null) {
      this.navbarPosition = [true, detail.categoryId, detail.id];
    }
    
  }
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
      this.setState({userRating: (rating || 0).toString()});
    }
    window.addEventListener(EVENT.SIGN_OUT, this.signoutHandler);
  }
  componentWillUnmount() {
    window.removeEventListener(EVENT.SIGN_OUT, this.signoutHandler);
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
              <section>
                <span>Your rating:  </span>
                {this.state.user &&<RatingStar score={this.state.userRating} callBack={this.rateItHandler}/>}
                {!this.state.user && <a className={styles.clickable} href="/login">Login to rate me!</a>}
              </section>
              <h2>Time: {this.state.detail.time}</h2>
            </div>
            
            {this.state.detail.videoURL !== ""&&
            <div className = {styles.videoWrapper}> 
              <Video 
                url = {this.state.detail.videoURL}
                title = {this.state.detail.title}
                alt = {`${this.state.detail.shortName} dish `}
                />
            </div>}

            {this.state.detail.videoURL === ""&&
            <div > 
              <img
                className = {styles.imageWrapper}
                src = {this.state.detail.imageURL}
                alt = {`${this.state.detail.shortName} dish `}
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

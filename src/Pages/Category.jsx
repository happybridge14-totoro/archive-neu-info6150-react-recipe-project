import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getCategoryById, getItemsByCategoryId} from "../Proxy/Data";
import styles from "./Category.module.css"
import NavigationBar from "../Widgets/NavigationBar"

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: getCategoryById(this.props.id),
      detail: getItemsByCategoryId(this.props.id)
  
    };
    this.navbarPosition = [true, true, this.state.category.id];
  }

  handleClick = (id) => {
    window.location.href = `/detail/${id}`;
  }

  renderGetResults = () => {
    let result = [];
    let index = 0;
    let items = this.state.detail;
      items.forEach((v) => {
        result.push(<div tabIndex="0" onClick={(e)=>{this.handleClick(v.id)}} className={styles.itemBox} key={index++}>
            <img className={styles.pic} src={v.imageURL} alt={v.title}></img>
            <div>
              {v.videoURL !== "" &&
                <img className={styles.playSign} src="/images/video-icon.png" alt="video" key={index++}/>
              }
            </div>
            <div>
              <a className={styles.subtitle} href={`/detail/${v.id}`}>{v.title}</a>
              <div className={styles.text}>{v.time}</div>
            </div>
          </div>);
        });
    return result;
  }
  
  render() {
    if (this.state.category === null) {
      window.location.href = '/error';
      return;
    }
    return (
      <div className={styles.category}>
         <NavigationBar positions={this.navbarPosition}/>
        <div className={styles.picBox}>
          <img className={styles.picDessert} src={this.state.category.imageURL} alt={this.state.category.name}/>
        </div>
        <h3 className={styles.title}>{this.state.category.name}</h3>
        <div>
          {this.renderGetResults()}
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  id: PropTypes.string.isRequired
};

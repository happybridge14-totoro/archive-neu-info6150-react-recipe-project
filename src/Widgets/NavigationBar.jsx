import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getCategoryById, getItemById} from "../Proxy/Data";
import styles from "./NavigationBar.module.css";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondLabelName: "",
      category: null,
      item: null
    }
  }
  componentDidMount() {
    let newState = {};
    let secondParam = this.props.positions[1];
    if (secondParam === "about") {
      newState.secondLabelName = "About";
    } else if (secondParam === "search") {
      newState.secondLabelName = "Search";
    } else if (secondParam === "contact") {
      newState.secondLabelName = "Contact";
    } else if (secondParam === "404") {
      newState.secondLabelName = "404";
    } else if (this.props.positions[1]) {
      newState.secondLabelName = "Categories";
      if (this.props.positions[2]) {
        newState.category = getCategoryById(this.props.positions[2]);
        if (this.props.positions[3]) {
          newState.item = getItemById(this.props.positions[3]);
        }
      }
    }
    this.setState(newState);
  }
  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  renderNavbarItems = (ary) => {
    let index = 0;
    ary.push(<a className={`clickable ${styles.item}`} href="/" key={index++}>Home</a>);
    if (this.state.secondLabelName !== "") {
      ary.push(<div className={styles.sign} key={index++}>›</div>);
      if (this.state.category) {
        ary.push(<a className={`clickable ${styles.item}`} href="/allcategories/" key={index++}>Categories</a>);
        ary.push(<div className={styles.sign} key={index++}>›</div>);
        if (this.state.item) {
          ary.push(<a className={`clickable ${styles.item}`} href={`/category/${this.state.category.id}`} key={index++}>{this.state.category.name}</a>);
          ary.push(<div className={styles.sign} key={index++}>›</div>);
          ary.push(<span className={styles.nonClickableItem} key={index++}>{this.state.item.title}</span>);
        } else {
          ary.push(<span className={styles.nonClickableItem} key={index++}>{this.state.category.name}</span>);
        }
      } else {
        ary.push(<span className={styles.nonClickableItem} key={index++}>{this.state.secondLabelName}</span>);
      }
    }
  }

  render() {
    let items = [];
    this.renderNavbarItems(items);
    return (
      <div className={styles.container}>
        {items}
      </div>
    )
  }
}

NavigationBar.propTypes = {
  positions: PropTypes.array.isRequired
};

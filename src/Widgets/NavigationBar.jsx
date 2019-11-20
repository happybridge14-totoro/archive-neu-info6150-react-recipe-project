import React, { Component } from "react";
import PropTypes from 'prop-types';
import {getCategoryById, getItemById} from "../Proxy/Data";
import styles from "./NavigationBar.module.css";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAllCategory: false,
      category: null,
      item: null
    }
  }
  componentDidMount() {
    let newState = {};
    if (this.props.positions[1]) {
      newState.displayAllCategory = true;
    }
    if (this.props.positions[2]) {
      newState.category = getCategoryById(this.props.positions[2]);
      if (this.props.positions[3]) {
        newState.item = getItemById(this.props.positions[3]);
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
    if (this.state.displayAllCategory) {
      ary.push(<div className={styles.sign} key={index++}>›</div>);
      ary.push(<a className={`clickable ${styles.item}`} href={`/allcategories`} key={index++}>Categories</a>);
    }
    if (this.state.category) {
      ary.push(<div className={styles.sign} key={index++}>›</div>);
      ary.push(<a className={`clickable ${styles.item}`} href={`/category/${this.state.category.id}`} key={index++}>{this.state.category.name}</a>);
      if (this.state.item) {
        ary.push(<div className={styles.sign} key={index++}>›</div>);
        ary.push(<a className={`clickable ${styles.item}`} href={`/detail/${this.state.item.id}`} key={index++}>{this.state.item.title}</a>);
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

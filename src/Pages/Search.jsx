import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./Search.module.css";

let data;

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.search}>
        <ul>
          <li>1</li>
        </ul>
      </div>
    )
  }
}

Search.propTypes = {
  keyword: PropTypes.string.isRequired
};

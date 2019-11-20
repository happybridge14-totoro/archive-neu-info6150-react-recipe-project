import React, { Component } from "react";

import styles from "./DropDown.module.css";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className={styles.dropDown}>
        <div className={`clickable ${styles.title}`}>
            title
        </div>
        <div className={styles.contentContainer}>
            <div className={`clickable ${styles.item}`}>
                hello 1
            </div>
            <div className={`clickable ${styles.item}`}>
                hello 2
            </div>
            <div className={`clickable ${styles.item}`}>
                hello 3
            </div>
        </div>
      </div>
    )
  }
}

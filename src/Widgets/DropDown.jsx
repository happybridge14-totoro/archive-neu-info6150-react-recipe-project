import React, { Component } from "react";

import styles from "./NavigationBar.module.css";

export default class DropDown extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div >
          hello
      </div>
    )
  }
}

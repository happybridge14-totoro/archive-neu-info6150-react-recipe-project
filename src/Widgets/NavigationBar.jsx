import React, { Component } from "react";

import styles from "./NavigationBar.module.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.positions = [{
      name: "Home",
      url: "/"
    },{
      name: "Dessert",
      url: "/"
    },{
      name: "Cookies",
      url: "/about"
    }];
    this.state = {
      value: "",

    };
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  renderNavbar = (ary) => {
    this.positions.forEach((v, i) => {
      if (i !== 0) {
        ary.push(<div className={styles.sign} key={2*i}>›</div>);
      }
      ary.push(<a className={`clickable ${styles.item}`} href={v.url} key={2*i+1}>{v.name}</a>);
    });
  }

  render() {
    let items = [];
    this.renderNavbar(items);
    return (
      <div className={styles.container}>
        {items}
      </div>
    )
  }
}

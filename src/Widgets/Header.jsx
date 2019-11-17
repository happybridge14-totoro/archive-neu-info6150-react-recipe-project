import React, { Component } from "react";
import styles from "./Header.module.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onSearch = (e) => {
    console.log("hello");
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <header className={`${styles.header} background-color`}>
        <nav className={styles.nav}>
          <a className={`clickable ${styles.home} ${styles.navButton}`} href="/">Home</a>
          <a className={`clickable ${styles.category} ${styles.clickable} ${styles.navButton}`} href="/">Category</a>
          <img className={styles.logo} src="../../images/logo.png" alt="logo"/>
          <div className={styles.search}>
            <input type="text" value={this.state.value} onChange={this.handleChange} maxLength="16"/>
            <img className={styles.searchIcon} src="../../images/search.png" alt="logo" onClick={this.onSearch}/>
          </div>
        </nav>
      </header>
    )
  }
}

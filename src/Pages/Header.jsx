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
    console.log("todo");
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({value: e.target.value});
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      console.log('enter press here! ')
      //this.search();
    }
  }

  render() {
    return (
      <header className={`${styles.header} background-color`}>
        <nav className={styles.nav}>
          <a className={`clickable ${styles.home} ${styles.navButton}`} href="/">Home</a>
          <a className={`clickable ${styles.category} ${styles.clickable} ${styles.navButton}`} href="/">Category</a>
          <img className={styles.logo} src="../../images/logo2.png" alt="logo"/>
          <div className={styles.search}>
            <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} maxLength="16"/>
            <img className={styles.searchIcon} src="../../images/search.png" alt="logo" onClick={this.onSearch}/>
          </div>
        </nav>
      </header>
    )
  }
}

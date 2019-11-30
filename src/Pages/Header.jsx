import React, { Component } from "react";
import styles from "./Header.module.css";
import DropDown from "../Widgets/DropDown";
import {getCategories} from "../Proxy/Data";
import {signOut} from "../Proxy/UserData";

export default class Header extends Component {
  constructor(props) {
    super(props);
    let state = {
      value: "",
      username: "",
      nickname: ""
    };
    this.userInfo = {};
    if (this.props.userInfo) {
      state.username = this.props.userInfo.username;
      state.nickname = this.props.userInfo.nickname;
    }
    this.state = state;
    let categories = getCategories();
    this.categoryDropdown = {
      "title": {
        "name": "Category",
        "link": "/allcategories"
      },
      "items": categories.map((v) => {
        return {
          "name": v.name,
          "link": `/category/${v.id}`
        };
      })
    }
  }

  search = () => {
    if (this.state.value !== "") {
      window.location.href = `/search/${this.state.value}`;
    }
  }

  onSearch = (e) => {
    this.search();
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      this.search();
    }
  }
  handleSignOut = (e) => {
    e.preventDefault();
    signOut();
    this.setState({
      username: "",
      nickname: ""
    });
  }

  renderUser = () => {
    console.log(this.state.username)
    if (this.state.username !== "") {
      return (<div className={styles.userInfo}>
        <div>Hello, {this.state.nickname}</div>
        <div tabIndex="0" onClick={this.handleSignOut} className={`${styles.signOut} clickable`}>Sign Out</div>
      </div>);
    } else {
      return (<a className={`clickable ${styles.signIn} ${styles.navButton}`} href="/login">Sign in</a>);
    }
  }
  render() {
    return (
      <header className={`${styles.header} background-color`}>
        <nav className={styles.nav}>
          <a className={`clickable ${styles.home} ${styles.navButton}`} href="/">Home</a>
          <div className={styles.dropDownContainer}>
            <DropDown data={this.categoryDropdown}/>
          </div>
          {this.renderUser()}
          <div className={styles.search}>
            <input type="text" value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} maxLength="16"/>
            <img className={styles.searchIcon} src="../../images/search.png" alt="logo" onClick={this.onSearch}/>
          </div>
          <img className={styles.logo} src="../../images/logo2.png" alt="logo"/>
        </nav>
      </header>
    )
  }
}

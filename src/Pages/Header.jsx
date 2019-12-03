import React, {memo, useContext, useState, useEffect} from "react";
import styles from "./Header.module.css";
import DropDown from "../Widgets/DropDown";
import {getCategories} from "../Proxy/Data";
import {signOut} from "../Proxy/UserData";
import {PopupContext, SHOW} from "../context/showPopupContext";

const Header = memo((props) => {
  const [keyword, setKeyword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    if (props.userInfo) {
      setUsername(props.userInfo.username);
      setNickname(props.userInfo.nickname);
    }
  }, [props.userInfo]);
  const categoryDropdown = {
    "title": {
      "name": "Category",
      "link": "/allcategories"
    },
    "items": getCategories().map((v) => {
      return {
        "name": v.name,
        "link": `/category/${v.id}`
      };
    })
  };
  const showPopup = useContext(PopupContext);
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
    setUsername("");
    setNickname("");
  };
  const handleSearch = (e) => {
    if (keyword !== "" && (!e.key || (e.key && e.key === 'Enter'))) {
        e.preventDefault();
        window.location= `/search/${keyword}`;
    }
  };
  const renderUser = () => {
    if (username !== "") {
      return (<div className={styles.userInfo}>
        <div>Hello, {nickname}</div>
        <div tabIndex="0" onClick={handleSignOut} className={`${styles.signOut} clickable`}>Sign Out</div>
      </div>);
    } else {
      return (<a className={`clickable ${styles.signIn} ${styles.navButton}`} href="/login">Sign in</a>);
    }
  }
  return (
    <header className={`${styles.header} background-color ${showPopup===SHOW ? styles.showPopup : ""}`}>
      <nav className={styles.nav}>
        <div className={styles.group}>
          <img className={styles.logo} src="../../images/logo2.png" alt="logo"/>
          <a className={`clickable ${styles.home} ${styles.navButton}`} href="/">Home</a>
          <div className={styles.dropDownContainer}>
            <DropDown data={categoryDropdown}/>
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.search}>
            <input
              type="text"
              value={keyword}
              onChange={(e)=>{setKeyword(e.target.value)}}
              onKeyPress={handleSearch}
              maxLength="16"/>
            <img className={styles.searchIcon} src="../../images/search.png" alt="logo" onClick={handleSearch}/>
          </div>
          {renderUser()}
        </div>
      </nav>
    </header>
  )
});
export default Header;

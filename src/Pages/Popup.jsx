import {ulid} from "ulid";
import React, { Component } from "react";
import styles from "./Popup.module.css";
import EVENT from "../Proxy/Event";

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    window.addEventListener(EVENT.DISPLAY_POPUP, this.displayPopup);
    window.addEventListener(EVENT.DISMISS_POPUP, this.dismissPopup);
  }
  getInitialState = () => {
    return {
      display: false,
      title: "",
      body: [],
      buttonText: "",
      callBack: null
    };
  }
  displayPopup = (e) => {
    document.body.style.cssText = "overflow: hidden;";
    window.addEventListener("keydown", this.keyUpHandler, true);
    window.addEventListener("scroll", this.scrollHandler, true);
    let newState = {
      display: true,
      title: e.detail.title,
      body: e.detail.body,
      buttonText: e.detail.buttonText,
      callBack: e.detail.callBack
    }
    this.setState(newState);
  }
  dismissPopup = (e) => {
    document.body.style.cssText = "";
    window.removeEventListener("keydown", this.keyUpHandler, true);
    window.removeEventListener("scroll", this.scrollHandler, true);
    let callBack = this.state.callBack;
    this.setState(this.getInitialState());
    if (callBack) {
      callBack();
    }
  }
  keyUpHandler = (e) => {
    if (e.keyCode === 9) {
      e.stopImmediatePropagation();
      e.preventDefault();
      document.getElementById("confirm").focus()  ;
    } else if (e.keyCode === 13) {
      window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
    }
  }
  clickHandler = (e) => {
    window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
  }
  scrollHandler = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
  render() {
    if (this.state.display) {
      return (
        <div className={`${styles.popup} + ${this.state.display ? "" : " " + styles.hidden}`}>
          <section className={styles.container} autoFocus={true}>
            <h1 className={styles.head}>{this.state.title}</h1>
            {this.state.body.map((v) => {
              return <p className={styles.body} key={ulid()}>{v}</p>;
            })}
            <button id="confirm" className={`baseButton ${styles.button}`}  onClick={this.clickHandler}>{this.state.buttonText}</button>
          </section>
        </div>
      )
    } else {
      return null;
    }
  }
}

import {ulid} from "ulid";
import React, {useState, useEffect} from "react";
import styles from "./Popup.module.css";
import EVENT from "../Proxy/Event";

let gScrollHandler, gKeyUpHandler = null;
const Popup = (props) => {
  const initState = {
    display: false,
    title: "",
    body: [],
    buttonText: "",
    callBack: null
  };
  const [state, setState] = useState(initState);
  const keyUpHandler = (e) => {
    if (e.keyCode === 9) {
      e.stopImmediatePropagation();
      e.preventDefault();
      document.getElementById("confirm").focus()  ;
    } else if (e.keyCode === 13) {
      window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
    }
  }
  const clickHandler = (e) => {
    window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
  }
  const scrollHandler = (e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
  const displayPopup = (e) => {
    if (!state.display) {
      document.body.style.overflow = "hidden;";
      gKeyUpHandler = keyUpHandler;
      gScrollHandler = scrollHandler;
      window.addEventListener("keydown", keyUpHandler, true);
      window.addEventListener("scroll", scrollHandler, true);
    }
    setState({...e.detail, display: true});
  };
  const dismissPopup = (e) => {
    document.body.style.overflow = "unset";
    if (gKeyUpHandler) {
      window.removeEventListener("keydown", gKeyUpHandler, true);
      gKeyUpHandler = null;
    }
    if (gScrollHandler) {
      window.removeEventListener("scroll", gScrollHandler, true);
      gScrollHandler = null;
    }
    setState(initState);
    if (state.callBack) {
      state.callBack();
    }
  };
  useEffect(() => {
    window.addEventListener(EVENT.DISPLAY_POPUP, displayPopup);
    window.addEventListener(EVENT.DISMISS_POPUP, dismissPopup);
    return () => {
      window.removeEventListener(EVENT.DISPLAY_POPUP, displayPopup);
      window.removeEventListener(EVENT.DISMISS_POPUP, dismissPopup);
    }
  });
  if (state.display) {
    return (
      <div className={styles.popup}>
        <section className={styles.container} autoFocus={true}>
          <h1 className={styles.head}>{state.title}</h1>
          {state.body.map((v) => {
            return <p className={styles.body} key={ulid()}>{v}</p>;
          })}
          <button id="confirm" className={`baseButton ${styles.button}`}  onClick={clickHandler}>{state.buttonText}</button>
        </section>
      </div>
    )
  } else {
    return null;
  }
};
export default Popup;

import {ulid} from "ulid";
import React, {useState, useEffect, useCallback} from "react";
import styles from "./Popup.module.css";
import EVENT from "../Proxy/Event";

const initState = {
  display: false,
  title: "",
  body: [],
  buttonText: "",
  callBack: null
};
const Popup = (props) => {
  const [state, setState] = useState(initState);
  const keyUpHandler = useCallback((e) => {
    if (e.keyCode === 9) {
      e.stopImmediatePropagation();
      e.preventDefault();
      document.getElementById("confirm").focus()  ;
    } else if (e.keyCode === 13) {
      window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
    }
  }, []);
  const clickHandler = useCallback((e) => {
    window.dispatchEvent(new Event(EVENT.DISMISS_POPUP));
  }, []);
  const scrollHandler = useCallback((e) => {
    e.stopImmediatePropagation();
    e.preventDefault();
  }, []);
  const displayPopup = useCallback((e) => {
    if (!state.display) {
      document.body.style.overflow = "hidden;";
      window.addEventListener("keydown", keyUpHandler, true);
      window.addEventListener("scroll", scrollHandler, true);
    }
    setState({...e.detail, display: true});
  }, [keyUpHandler, scrollHandler, state.display]);
  const dismissPopup = useCallback((e) => {
    document.body.style.overflow = "unset";
    window.removeEventListener("keydown", keyUpHandler, true);
    window.removeEventListener("scroll", scrollHandler, true);
    setState(initState);
    if (state.callBack) {
      state.callBack();
    }
  }, [keyUpHandler, scrollHandler, state]);
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

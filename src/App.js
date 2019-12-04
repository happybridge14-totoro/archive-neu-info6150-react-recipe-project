import React, {useState, useEffect, useCallback} from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Pages/Home";
import Header from "./Pages/Header";
import Footer from "./Pages/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Search from "./Pages/Search";
import AllCategories from "./Pages/AllCategories";
import Category from "./Pages/Category";
import Detail from "./Pages/Detail";
import Popup from "./Pages/Popup";
import Login from "./Pages/Login";
import {getStatus} from "./Proxy/UserData";
import "./App.css";
import EVENT from "./Proxy/Event";
import {PopupContext, SHOW, HIDE} from "./context/showPopupContext";

function App() {
  const [hasPopup, setHasPopup] = useState(false);
  const handleDisplay = useCallback((e) => { setHasPopup(true); }, []);
  const handleDismiss = useCallback((e) => { setHasPopup(false); }, []);
  useEffect(() => {
    window.addEventListener(EVENT.DISPLAY_POPUP, handleDisplay);
    window.addEventListener(EVENT.DISMISS_POPUP, handleDismiss);
    return () => {
      window.removeEventListener(EVENT.DISPLAY_POPUP, handleDisplay);
      window.removeEventListener(EVENT.DISMISS_POPUP, handleDismiss);
    };
  });
  return (
    <Router >
      <PopupContext.Provider value={hasPopup ? SHOW : HIDE}>
        <Header userInfo={getStatus()} hasPopup={hasPopup}/>
        <div className={hasPopup ? "showPopup" : ""}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
            <Route path="/allcategories" exact component={AllCategories} />
            <Route path="/category/:categoryId" exact render={({match})=> <Category id={match.params.categoryId}/>}/>
            <Route path="/detail/:itemId" exact render={({match})=> <Detail id={match.params.itemId}/>}/>
            <Route path="/search/:keyword" exact render={({match})=> <Search keyword={match.params.keyword}/>}/>
            <Route path="/404" exact component={Error}/>
            <Route component={Error} />
          </Switch>
        </div>
        <Footer hasPopup={hasPopup}/>
      </PopupContext.Provider>
      <Popup/>
    </Router>
  );
}

export default App;

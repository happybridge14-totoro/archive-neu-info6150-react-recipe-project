import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Home/Home";
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
import Server from "./Proxy/MockServer/Server";
import {getStatus} from "./Proxy/UserData";
import styles from "./App.css";

function App() {
  // Server.test();
  let userInfo = getStatus();
  return (
    <Router className={styles.container}>
      <Header userInfo={userInfo}/>
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
      <Footer/>
      <Popup/>
    </Router>
  );
}

export default App;

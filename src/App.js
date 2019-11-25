import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Home/Home.jsx";
import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Error from "./Pages/Error.jsx";
import Search from "./Pages/Search.jsx";
import AllCategories from "./Pages/AllCategories.jsx";
import Category from "./Pages/Category.jsx";
import Detail from "./Pages/Detail.jsx";
import Popup from "./Pages/Popup.jsx";

import styles from "./App.css"

function App() {
  return (
    <Router className={styles.container}>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/allcategories" exact component={AllCategories} />
        <Route path="/category/:categoryId" exact render={({match})=> <Category id={match.params.categoryId}/>}/>
        <Route path="/detail/:itemId" exact render={({match})=> <Detail id={match.params.itemId}/>}/>
        <Route path="/search/:keyword" exact render={({match})=> <Search keyword={match.params.keyword}/>}/>
        <Route path="/error" exact component={Error}/>
        <Route component={Error} />
      </Switch>
      <Footer/>
      <Popup/>
    </Router>
  );
}

export default App;

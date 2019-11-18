import React from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./Home/Home.jsx";
import Foo from "./Foo/Foo.jsx";
import Bar from "./Bar/Bar.jsx";
import Baz from "./Baz/Baz.jsx";

import Header from "./Pages/Header.jsx";
import Footer from "./Pages/Footer.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Error from "./Pages/Error.jsx";
import Search from "./Pages/Search.jsx";
import AllCategories from "./Pages/AllCategories.jsx";
import Category from "./Pages/Category.jsx";

import styles from "./App.css"

const externalContent = {
  id: "article-1",
  title: "An Article",
  author: "April Bingham",
  text: "Some text in the article"
};


function App() {
  return (
    <Router className={styles.container}>
      <Header/>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/foo" exact component={Foo} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/allcategories" exact component={AllCategories} />
        <Route path="/category/:categoryId" exact render={({match})=> <Category id={match.params.categoryId}/>}/>
        <Route path="/search/:keyword" exact render={({match})=> <Search keyword={match.params.keyword}/>}/>
        <Route
          path="/bar/:categoryId/:productId"
          exact
          render={({ match }) => (
            <Bar
              categoryId={match.params.categoryId}
              productId={match.params.productId}
            />
          )}
        />
        <Route
          path="/baz"
          exact
          render={() => <Baz content={externalContent} />}
        />
        <Route path="/error" exact component={Error}/>
        <Route component={Error} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;

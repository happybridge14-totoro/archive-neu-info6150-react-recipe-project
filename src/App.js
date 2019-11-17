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
        <Route component={Error} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;

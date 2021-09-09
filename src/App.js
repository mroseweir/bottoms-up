import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Landing from "./Pages/Landing";
import Favorites from "./Pages/Favorites";
import Login from "./Pages/Login";
import Random from "./Pages/Random";
import Search from "./Pages/Search";
import Register from "./Pages/Register";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/favorites"
            render={(props) =>
              isAuthenticated ? (
                <Favorites {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/Login"
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/search" />
              )
            }
          />
          <Route exact path="/Random" component={Random} />
          <Route
            exact
            path="/Search"
            render={(props) => <Search {...props} />}
          />
          <Route
            exact
            path="/Register"
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/search" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

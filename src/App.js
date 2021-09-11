import React, { useState, useEffect } from "react";
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
import Logout from "./Pages/Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

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
                <Redirect to="/Login" />
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
                <Redirect to="/Logout" />
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
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/Logout"
            render={(props) =>
              isAuthenticated ? (
                <Logout {...props} setAuth={setAuth} />
              ) : (
                <Redirect to="/Login" />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

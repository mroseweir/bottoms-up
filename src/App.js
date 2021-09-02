import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
import Favorites from "./Pages/Favorites";
import Login from "./Pages/Login";
import Random from "./Pages/Random";
import Search from "./Pages/Search";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/Login" component={Login} />
          <Route path="/Random" component={Random} />
          <Route path="/Search" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

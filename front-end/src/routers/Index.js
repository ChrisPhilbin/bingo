import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BingoCard from "../components/player/BingoCard";
import Home from "../static/Home";
import NotFound from "../static/NotFound";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/play" component={BingoCard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;

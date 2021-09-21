import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BingoCard from "../components/player/BingoCard";
import Home from "../static/Home";
import GameList from "../components/host/GameList";
import NotFound from "../static/NotFound";
import Login from "../static/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/host/games" component={GameList} />
        <Route exact path="/play" component={BingoCard} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;

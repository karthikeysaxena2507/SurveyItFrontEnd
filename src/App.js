import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Create from "./Pages/Create";

const App = () => {

  return (
  <Router>
    <Route exact path="/" component = {Login}/>
    <Route exact path="/home" component = {Home}/>
    <Route exact path="/create" component = {Create}/>
    <Route exact path="/edit/:id" component = {Edit}/>
    <Route exact path="/register" component = {Register}/>
  </Router>)
}

export default App;

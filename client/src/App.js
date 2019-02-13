import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import NavTabs from "./components/NavTabs";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavTabs/>
        </div>
      </Router>
    );
  }
}

export default App;

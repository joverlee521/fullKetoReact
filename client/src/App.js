import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import IsItKeto from "./components/pages/IsItKeto";
import Recipes from "./components/pages/Recipes";
import MealPlanner from "./components/pages/MealPlanner";

const styles = theme => ({
	spacer: theme.mixins.toolbar // loads dimensions of the AppBar
});

class App extends Component {
	state = {
		loggedIn: false
	};

	componentDidMount(){
		axios.get("/auth/user").then(response => {
			console.log(response.data);
		});
	}

	render() {
		const { classes } = this.props;
	  	return (
	  	  	<Router>
	  	  	  	<div>
	  	  	  	  	<NavBar loggedIn={ this.state.loggedIn }/>
					<div className={ classes.spacer }></div>
					<Route exact path="/" component={ Home } />
					<Route exact path="/isitketo" component= { IsItKeto } />
					<Route exact path="/recipes" component= { Recipes } />
					<Route exact path="/mealplanner" component= { MealPlanner } />
	  	  	  	</div>
	  	  	</Router>
	  	);
	}
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

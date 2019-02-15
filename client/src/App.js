import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import API from "./utils/API";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import IsItKeto from "./pages/IsItKeto";
import Recipes from "./pages/Recipes";
import MealPlanner from "./pages/MealPlanner";

const styles = theme => ({
	spacer: theme.mixins.toolbar // loads dimensions of the AppBar
});

class App extends Component {
	state = {
		loggedIn: false,
		user: {}
	};

	componentWillMount(){
		API.getCurrentUser()
			.then(res => {
				const { user } = res.data;
				if(user){
					this.setState({
						loggedIn: true,
						user: user
					});
				}
			})
			.catch(err => {
				console.log(err);
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

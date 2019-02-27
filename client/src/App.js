import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import API from "./utils/API";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IsItKeto from "./pages/IsItKeto";
import Recipes from "./pages/Recipes";
import MealPlanner from "./pages/MealPlanner";
import Footer from "./components/Footer";
import "./App.css";

const styles = theme => ({
	// loads dimensions of the AppBar
	// Used to create spacer div so AppBar doesn't cover main content
	spacer: theme.mixins.toolbar
});

class App extends Component {
	state = {
		loggedIn: false,
		user: {}
	};

	componentWillMount(){
		// Hit API to see if there is a user currently logged in
		API.getCurrentUser()
			.then(res => {
				const { user } = res.data;
				// If there is a user, set the state with user info 
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

	updateUser = newUserInfo => {
		this.setState({ user: newUserInfo });
	}

	render() {
		const { classes } = this.props;
	  	return (
	  	  	<Router>
	  	  	  	<div id="app">
	  	  	  	  	<NavBar loggedIn={ this.state.loggedIn }/>
					<div className={ classes.spacer }></div>
					<Route exact path="/" 
						render={ props => this.state.loggedIn ? <Dashboard {...props} user={ this.state.user } updateUser={ this.updateUser }/> : <Home/> }/>
					<Route exact path="/isitketo" component= { IsItKeto } />
					<Route exact path="/recipes" 
						render={ props => <Recipes {...props} loggedIn={ this.state.loggedIn } user={ this.state.user }/>}/>
					<Route exact path="/mealplanner" 
						render={ props => <MealPlanner {...props} loggedIn={ this.state.loggedIn } user={ this.state.user }/>} />
					<Footer/>
	  	  	  	</div>
	  	  	</Router>
	  	);
	}
}

// Typechecking on the props of the component
App.propTypes = {
	// Component expects a prop 'classes' that is an object and is a Required prop
    classes: PropTypes.object.isRequired,
};

// Using withStyles to inject custom styles
// passes the "classes" prop to the component
export default withStyles(styles)(App);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import GoogleSignInButton from "../components/GoogleSignInButton";

const styles = {
	content: {
		flex: "2 0 auto",
		color: deepOrange[900],
		padding: 10,
		textAlign: "center"
	}
};

class MealPlanner extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	render(){
		const { classes, loggedIn, user } = this.props;
		return (
			<Grid container direction="column" className="container">
				<Banner title="Meal Planner"/>
				<Grid container item  className={ classes.content } justify="center" alignContent="center">
					{ loggedIn ? 
						<Grid item>
							<Typography variant="h4" color="inherit">{ user.username }'s Calendar Coming Soon!</Typography>
						</Grid>
						: <Grid item> 
							<Typography variant="h4" color="inherit">Please sign in to see your personal meal planner</Typography>
							<GoogleSignInButton width="190px"/>
						</Grid>
					}
				</Grid>
			</Grid>
		);
	}
}

MealPlanner.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MealPlanner);

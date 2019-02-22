import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Icon, Avatar, Button, Typography, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";

const styles = theme => ({
	container: {
		padding: "0% 1% 5%",
		[theme.breakpoints.up("sm")]: {
			padding: "0% 5% 5%"
		},
		[theme.breakpoints.up("md")]: {
			padding: "0% 15% 3%"
		},
		[theme.breakpoints.up("lg")]: {
			padding: "0% 20% 2%"
		},
	},
	link: {
		margin: "10px 10px 0px 10px",
		"&:hover": {
			backgroundColor: "transparent"
		}
	},
	headline: {
		padding: "20px 10px",
		color: deepOrange[700]
	},
	icon: {
		padding: 5,
		backgroundColor: deepOrange[700],
		color: "#fff"
	},
	description: {
		paddingLeft: 80,
		[theme.breakpoints.up("md")]: {
			paddingLeft: 120
		}
	}
});

function Home(props) {
	const { classes } = props;
	return (
		<Grid container direction="column" className="container">
			<Banner title="Full Keto" subtitle="Keto Simplified!"/>
			<Grid container item className={ classes.container }>
				<Grid item xs={ 12 }>
					<Button className={ classes.link } component={ Link } to="/isitketo">
						<Avatar className={ classes.icon }>
							<Icon fontSize="large">search</Icon>
						</Avatar>
						<Typography variant="h5" className={ classes.headline }>Is it Keto?</Typography>
					</Button>
				</Grid>
				<Grid item xs={ 12 }>
					<Typography gutterBottom variant="headline" className={ classes.description }>Search individual food items to see their carbohydrate content.</Typography>
				</Grid>
				<Grid item xs={ 12 }>
					<Button className={ classes.link } component={ Link } to="/recipes">
						<Avatar className={ classes.icon }>
							<Icon fontSize="large">restaurant</Icon>
						</Avatar>
						<Typography variant="h5" className={ classes.headline }>Recipes</Typography>
					</Button>
				</Grid>
				<Grid item xs={ 12 }>
					<Typography gutterBottom variant="headline" className={ classes.description }>Search ingredients to find Keto recipes.</Typography>
				</Grid>
				<Grid item xs={ 12 }>
					<Button className={ classes.link } component={ Link } to="/mealplanner">
						<Avatar className={ classes.icon }>
							<Icon fontSize="large" >calendar_today</Icon>
						</Avatar>
						<Typography variant="h5" className={ classes.headline }>Meal Planner</Typography>
					</Button>
				</Grid>
				<Grid item xs={ 12 }>
					<Typography gutterBottom variant="headline" className={ classes.description }>Sign in to access your personal meal planner.</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

Home.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home);

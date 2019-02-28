import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button, withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import ProgressCircle from "../components/Progress";
import Modal from "../components/Modal";
import HelperMethods from "../utils/helperMethods";
import API from "../utils/API";
import "./pages.css";

const styles = {
	recipeDisplay: {
		padding: "0px 20px"
	},
	randomButtonContainer: {
		marginTop: -50,
		marginBottom: 100
	},
	randomContainerPostSearch: {
		margin: "20px 0px 30px"
	},
	randomButton: {
		backgroundColor: orange[900],
        color: "#fff",
        "&:hover": {
            backgroundColor: orange[400]
        }
	}
}

class Recipes extends Component {
	constructor(props){
		super(props);
		this.state = {
			recipes: [],
			page: 1,
			error: false,
			errorMessage: "",
			searching: false
		}
		this.myRef = React.createRef();
	}

	searchRecipes = input => {
		this.setState({ recipes: [], error: false, searching: true }, () => {
			API.getEdamamRecipes(input)
				.then(res => this.setRecipeState(res))
				.catch(err => this.setErrorState(err));
		})
	}

	getRandomRecipes = () => {
		this.setState({ recipes: [], error: false, searching: true }, () => {
			API.getRandomRecipes()
				.then(res => this.setRecipeState(res))
				.catch(err => this.setErrorState(err));
		})
	}

	setRecipeState = result => {
		let recipes = result.data.hits;
		const recipeState = HelperMethods.createSubArrays(recipes, 12);
		this.setState({ recipes: recipeState, page: 1, searching: false });
	}

	setErrorState = error => {
		if(error.response.status === 404){
			return this.setState({ recipes: [], error: true, errorMessage: error.response.data, searching: false });
		}
		return this.setState({ recipes: [], error: true, errorMessage: "Something went wrong! Please try again!", searching: false });
	}

	changePage = newPage => {
		this.setState({ page: newPage }, this.scrollToTop );
	}

	scrollToTop = () => {
		this.myRef.current.scrollIntoView();
	}

	render(){
		const { classes, loggedIn, user } = this.props
		return (
			<Grid container direction="column" className="container">
				<div ref={ this.myRef }></div>
				<Banner title="Recipes"/>
				<SearchBar placeholder="Search ingredients" search={ this.searchRecipes }/>
				<Grid container item justify="center" alignContent="flex-start" className={ this.state.recipes.length > 0 ? classes.randomContainerPostSearch : classes.randomButtonContainer }>
                    <Button onClick={ this.getRandomRecipes } variant="contained" className={ classes.randomButton }>
                      Get Random Recipes
                    </Button>
                </Grid>
				{ this.state.recipes.length > 0 && 
					<div>
						<Grid container item justify="center" className={ classes.recipeDisplay }>
							{this.state.recipes[(this.state.page - 1)].map(recipe => {
								return <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } loggedIn={ loggedIn } user={ user }/>
							})}
						</Grid> 
						<Pagination pages={ this.state.recipes.length } changePage={ this.changePage }/>
					</div>
				}
				{ this.state.searching && <ProgressCircle /> }
				<Modal open={ this.state.error } title="ERROR" message={ this.state.errorMessage } closeBtn="Close"/>
			</Grid>
		);
	}
}

Recipes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Recipes);

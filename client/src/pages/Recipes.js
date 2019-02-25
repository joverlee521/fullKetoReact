import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button, withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import ProgressCircle from "../components/Progress";
import ErrorModal from "../components/ErrorModal";
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
		const recipeState = this.createSubArrays(recipes);
		this.setState({ recipes: recipeState, page: 1, searching: false });
	}

	createSubArrays = array => {
		const newArray = [];
		// Separating the returned array into smaller subarrays to make pagination easier
		// Continue splicing the original returned array until it has a length of 12 or less
		while(array.length > 12){
			// Each subarray has a length of 12
			let subArray = array.splice(0, 12);
			newArray.push(subArray);
		}
		// If the original array has any left over recipes, push it into the new array as well
		if(array.length > 0){
			newArray.push(array);
		}
		return newArray;
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
		const { classes, loggedIn } = this.props
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
						<Grid container item className={ classes.recipeDisplay }>
							{this.state.recipes[(this.state.page - 1)].map(recipe => {
								return <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } loggedIn={ loggedIn }/>
							})}
						</Grid> 
						<Pagination pages={ this.state.recipes.length } changePage={ this.changePage }/>
					</div>
				}
				{ this.state.searching && <ProgressCircle /> }
				<ErrorModal open={ this.state.error } message={ this.state.errorMessage } />
			</Grid>
		);
	}
}

Recipes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Recipes);

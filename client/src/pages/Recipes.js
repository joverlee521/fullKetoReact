import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import API from "../utils/API";
import "./pages.css";

const styles = {
	recipeDisplay: {
		padding: "0px 20px"
	}
}

class Recipes extends Component {
	constructor(props){
		super(props);
		this.state = {
			recipes: [],
			page: 1
		}
		this.myRef = React.createRef();
	}

	searchRecipes = input => {
		API.getEdamamRecipes(input)
			.then(res => {
				const recipeState = [];
				let recipes = res.data.hits;
				// Separating the returned array into smaller subarrays to make pagination easier
				// Continue splicing the original returned array until it has a length of 9 or less
				while(recipes.length > 9){
					// Each subarray has a length of 9
					let subarray = recipes.splice(0, 9);
					recipeState.push(subarray);
				}
				// If the original array has any left over recipes, push it into the new array as well
				if(recipes.length > 0){
					recipeState.push(recipes);
				}
				this.setState({ recipes: recipeState });
			})
			.catch(err => console.log(err));
	}

	changePage = newPage => {
		this.setState({ page: newPage }, this.scrollToTop );
	}

	scrollToTop = () => {
		console.log("scroll");
		this.myRef.current.scrollIntoView();
	}

	render(){
		const { classes } = this.props
		return (
			<Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
				<div ref={ this.myRef }></div>
				<Banner title="Recipes"/>
				<SearchBar placeholder="Search ingredients" search={ this.searchRecipes }/>
				{ this.state.recipes.length > 0 && 
					<div>
						<Grid container item className={ classes.recipeDisplay }>
							{this.state.recipes[(this.state.page - 1)].map(recipe => {
								return <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } />
							})}
						</Grid> 
						<Pagination pages={ this.state.recipes.length } changePage={ this.changePage }/>
					</div>
				}
			</Grid>
		);
	}
}

Recipes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Recipes);

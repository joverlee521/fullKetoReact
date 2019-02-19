import React, { Component } from "react";
import { Grid, withStyles } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import API from "../utils/API";
import "./pages.css";

const styles = {
	recipeDisplay: {
		padding: "0px 10px"
	}
}

class Recipes extends Component {
	constructor(props){
		super(props);
		this.state = {
			recipes: []
		}
	}

	searchRecipes = input => {
		API.getEdamamRecipes(input)
			.then(res => {
				console.log(res.data.hits);
				this.setState({ recipes: res.data.hits });
			})
			.catch(err => console.log(err));
	}

	render(){
		const { classes } = this.props
		return (
			<Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
				<Banner title="Recipes"/>
				<SearchBar placeholder="Search ingredients" search={ this.searchRecipes }/>
				{ this.state.recipes.length > 0 && 
					<Grid container item className={ classes.recipeDisplay }>
						{this.state.recipes.map(recipe => {
							return <RecipeCard key={ recipe.recipe.uri } recipe={ recipe.recipe } />
						})}
					</Grid> 
				}
			</Grid>
		);
	}
}

export default withStyles(styles)(Recipes);

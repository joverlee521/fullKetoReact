import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles, Typography } from "@material-ui/core";
import ProgressCircle from "./Progress";
import RecipeCard from "./RecipeCard";
import Pagination from "./Pagination";
import HelperMethods from "../utils/helperMethods";
import API from "../utils/API";

const styles = {
    container: {
        flex: "2 0 auto",
        padding: "20px 0px"
    }
};

class FavoriteRecipeDisplay extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: [],
            page: 1,
            loading: true
        }
    }

    componentWillMount(){
        API.getFavoriteRecipes(this.props.user.id)
        .then(res => {
            const recipeState = HelperMethods.createSubArrays(res.data, 8);
            this.setState({ recipes: recipeState, loading: false });
        })
        .catch(err => console.log(err));
    }

    updateRecipes = (id) => {
        let currentRecipes = this.state.recipes;
        // Find index of selected recipe within subArrays
        const index = currentRecipes.map(recipe => recipe.id).indexOf(id);
        // Remove selected recipes from subArray
        currentRecipes[(this.state.page - 1)].splice(index, 1);
        // If the subarray is now empty, remove the subarray from the array
        // Set the page state to previous page
        if(currentRecipes[(this.state.page - 1)].length === 0){
            currentRecipes.splice((this.state.page -1), 1);
            this.setState({ page: this.state.page - 1 });
        }
        // If the array is completely empty, set the recipes state to an empty array
        if(currentRecipes.length === 1 && currentRecipes[0].length === 0){
            this.setState({ recipes: [] });
        }
        else{
            this.setState({ recipes: currentRecipes });
        }
    }

    changePage = newPage => {
        this.setState({  page: newPage });
    }

    render(){
        const { classes, user } = this.props;
        return(
            { ...this.state.recipes.length > 0 ? 
            <Grid container item justify="center" className={ classes.container }>
                { this.state.recipes[(this.state.page - 1)].map(recipe => {
                    return( <RecipeCard key={ recipe.id } recipe={ recipe } loggedIn={ true } user={ user } updateRecipes={ () => this.updateRecipes(recipe.id)}/>)
                })}
                <Pagination pages={ this.state.recipes.length } changePage={ this.changePage }/>
            </Grid>
            : <Grid container item justify="center" alignItems="center" className={ classes.container }>
                {this.state.loading ? 
                    <ProgressCircle />
                    :<Typography variant="h6">No Favorite Recipes</Typography>
                }
            </Grid>
            }
        );
    }
}

FavoriteRecipeDisplay.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FavoriteRecipeDisplay);
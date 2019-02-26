import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, withStyles, Typography } from "@material-ui/core";
import RecipeCard from "./RecipeCard";
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
            page: 1
        }
    }

    componentWillMount(){
        API.getFavoriteRecipes(this.props.user.id)
        .then(res => this.setState({ recipes: res.data }))
        .catch(err => console.log(err));
    }

    updateRecipes = (id) => {
        let currentRecipes = this.state.recipes;
        const index = currentRecipes.map(recipe => recipe.id).indexOf(id);
        currentRecipes.splice(index, 1);
        this.setState({ recipe: currentRecipes });
    }

    render(){
        const { classes, user } = this.props;
        return(
            { ...this.state.recipes.length > 0 ? 
            <Grid container item justify="center" className={ classes.container }>
                { this.state.recipes.map(recipe => {
                    return( <RecipeCard key={ recipe.id } recipe={ recipe } loggedIn={ true } user={ user } updateRecipes={ () => this.updateRecipes(recipe.id)}/>)
                })}
            </Grid>
            : <Grid container item justify="center" alignItems="center" className={ classes.container }>
                <Typography variant="h6">No Favorite Recipes</Typography>
            </Grid>
            }
        );
    }
}

FavoriteRecipeDisplay.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FavoriteRecipeDisplay);
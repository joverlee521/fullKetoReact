import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import API from "../utils/API";
import RecipeCard from "./RecipeCard";

const styles = {
    container: {
        flex: "2 0 auto",
        textAlign: "center"
    },
    addRecipeBtn: {
        color: "#fff",
        backgroundColor: deepOrange[600],
        margin: "30px 10px",
        "&:hover": {
            backgroundColor: deepOrange[900]
        }
    }
};

class UserRecipes extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: []
        }
    }

    componentWillMount(){
        const { user } = this.props;
        API.getUserRecipes(user.id)
        .then(results => {
            results.data.forEach(recipe => {
                recipe.url = "/fullKetoRecipe/" + recipe.id;
            });
            console.log(results.data);
            this.setState({ recipes: results.data });
        })
        .catch(error => console.log(error));
    }

    render(){
        const { classes, user } = this.props;
        return(
            <Grid container item justify="center" alignContent="center" className={ classes.container }>
                {   this.state.recipes.length === 0 &&
                    <Grid container item direction="column" justify="center" alignContent="center"> 
                        <Typography variant="h6">You don't have any recipes!</Typography>
                        <Typography variant="subheading">Try adding a recipe!</Typography>
                    </Grid>
                }
                <Button component={ Link } to="/addRecipe" variant="contained" className={ classes.addRecipeBtn }>Add A Recipe</Button>
                { this.state.recipes.length > 0 &&
                    <Grid container item justify="center">
                        {this.state.recipes.map(recipe => (
                            <RecipeCard key={ recipe.id } recipe={ recipe } loggedIn={ true } user={ user }/>
                        ))}
                    </Grid>
                }
            </Grid>
        );
    }
}

UserRecipes.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserRecipes);
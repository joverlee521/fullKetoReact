import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import API from "../utils/API";

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
        .then(recipes => this.setState({ recipes: recipes }))
        .catch(error => console.log(error));
    }

    render(){
        const { classes } = this.props;
        return(
            <Grid container item justify="center" alignContent="center" className={ classes.container }>
                { this.state.recipes.length > 0 ? 
                    <Typography>Recipe display</Typography>
                    : <Grid container item direction="column" justify="center" alignContent="center"> 
                        <Typography variant="h6">You don't have any recipes!</Typography>
                        <Typography variant="subheading">Try adding a recipe!</Typography>
                        <Button component={ Link } to="/addRecipe" variant="contained" className={ classes.addRecipeBtn }>Add A Recipe</Button>
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
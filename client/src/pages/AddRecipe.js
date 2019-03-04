import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import GoogleSignInButton from "../components/GoogleSignInButton";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import API from "../utils/API";

const styles = {
    container: {
        flex: "2 0 auto",
        textAlign: "center",
        color: deepOrange[900]
    }
};

class AddRecipe extends Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }

    render(){
        const { classes, loggedIn } = this.props;
        return(
            <Grid container direction="column" className="container">
                <Banner title="Add Recipe" />
                <Grid container item justify="center" alignContent="center" className={ classes.container }>
                { loggedIn ? 
                    <RecipeForm />
                    : <Grid item>
                        <Typography variant="h4" color="inherit">Please sign in to add a recipe</Typography>
                        <GoogleSignInButton width="190px"/>
                    </Grid>
                }
                </Grid>
            </Grid>
        )
    }
}

AddRecipe.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddRecipe);
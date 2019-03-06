import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Paper, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import API from "../utils/API";
import HelperMethods from "../utils/helperMethods";

const styles = theme =>  ({
    container: {
        flex: "2 0 auto",
        color: deepOrange[900],
        padding: 10
    },
    imgContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        margin: "10px 5px",
        [theme.breakpoints.up("sm")]: {
            margin: "20px 5px"
        }
    },
    listContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: 20
    }
});

class DisplayRecipe extends Component{
    constructor(props){
        super(props);
        this.state ={
            recipe: {}
        }
    }

    componentWillMount(){
        // Grab the recipe id from the URL
        const url = window.location.href;
        const urlArray = url.split("/");
        const recipeId = urlArray[(urlArray.length - 1)];
        // Find the recipe in the database
        API.getRecipe(recipeId)
        .then(result => {
            result.data.ingredients = JSON.parse(result.data.ingredients);
            result.data.instructions = result.data.instructions.split(";");
            this.setState({ recipe: result.data })
        })
        .catch(error => console.log(error));
    }

    render(){
        const { classes } = this.props;
        const { recipe } = this.state;
        return(
            <Grid container direction="column" className="container">
                <Banner title={ recipe.title } subtitle={ recipe.Author && `Author: ${recipe.Author.username}`}/>
                { recipe.id &&
                <Grid container item justify="center" alignContent="center" className={ classes.container }>
                    <Grid container item xs={ 12 }>
                        <Grid item xs={ 12 }>
                            <Typography variant="h6" align="center"><b>Total Time:</b> { recipe.prepTime + recipe.cookTime } mins</Typography>
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Typography variant="subtitle1" align="center"><b>Prep: </b> { recipe.prepTime } mins <span>&nbsp; + &nbsp;</span> <b>Cook: </b> { recipe.cookTime } mins</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={ 12 }>
                        <Typography variant="h6" align="center" gutterBottom>Servings: { recipe.servings } <span>&nbsp;&nbsp;</span> Serving Size: { recipe.servingSize }</Typography>
                    </Grid>
                    <Grid item container xs={ 12 } sm={ 10 } md={ 8 } justify="center" alignItems="center">
                        <Paper component={ Grid } xs={ 11 } sm={ 8 } md={ 6 } item className={ classes.imgContainer }>
                            <img src={ recipe.image } alt={ `${recipe.title}` } width="80%" height="auto"/>
                        </Paper>
                        { recipe.description &&
                            <Grid item xs={ 12 }>
                                <Typography variant="subtitle1" align="center" gutterBottom>{ HelperMethods.capitalizeFirstLetter(recipe.description) }</Typography>
                            </Grid>
                        }
                    </Grid>
                    <Grid item container direction="column" xs={ 12 } sm={ 6 } alignItems="center">
                        <Typography variant="h6"><u>Ingredients: </u></Typography>
                        <ul className={ classes.listContainer }>
                        {
                            recipe.ingredients.map((ingredient,index) => (
                                <li key={ index }>
                                    <Typography align="left" variant="h6">{ `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}` }</Typography>
                                </li>
                            ))
                        }
                        </ul>
                    </Grid>
                    <Grid item container direction="column" xs={ 12 } sm={ 6 } alignItems="center">
                        <Typography variant="h6"><u>Instructions: </u></Typography>
                        <ol className={ classes.listContainer }>
                        {
                            recipe.instructions.map((instruction, index) => (
                                <li key={ index }>
                                    <Typography align="left" variant="h6">{ HelperMethods.capitalizeFirstLetter(instruction) }</Typography>
                                </li>
                            ))
                        }
                        </ol>
                    </Grid>
                </Grid>
                }
            </Grid>
        )
    }
}

DisplayRecipe.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DisplayRecipe);
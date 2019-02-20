import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardMedia, CardContent, Typography, withStyles } from "@material-ui/core";

const styles = {
    container: {
        padding: "10px 20px"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    recipeImage: {
        width: "100%",
        flex: "1 1 400px"
    },
    cardContent: {
        flex: "1 0 auto"
    }
};

function RecipeCard(props){
    const { classes, recipe } = props;
    return(
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } className={ classes.container }>
            <Card className={ classes.card }>
                <CardMedia image={ recipe.image } className={ classes.recipeImage }/>
                <CardContent className={ classes.cardContent }>
                    <Typography variant="title">{ recipe.label }</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
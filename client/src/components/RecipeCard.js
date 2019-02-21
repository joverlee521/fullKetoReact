import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Divider, withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const styles = {
    container: {
        padding: "10px 20px",
        height: 500
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100%"
    },
    recipeImage: {
        width: "100%",
        flex: "1 1 400px"
    },
    cardContent: {
        flex: "1 0 auto"
    },
    cardLink: {
        textDecoration: "none",
        color: orange[900] 
    },
    divider: {
        width: "100%"
    }
};

function RecipeCard(props){
    const { classes, recipe } = props;
    return(
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.container }>
            <Card className={ classes.card }>
                <CardMedia image={ recipe.image } className={ classes.recipeImage }/>
                <CardContent className={ classes.cardContent }>
                    <Typography variant="title">{ recipe.label }</Typography>
                </CardContent>
                <Divider className={ classes.divider } light/>
                <CardActions>
                    <Button>
                        <a className={ classes.cardLink } href={ recipe.url } rel="noopener noreferrer" target="_blank">{ recipe.source }</a>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
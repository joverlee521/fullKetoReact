import React from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardMedia, CardContent, CardActions, 
    Button, Typography, Divider, 
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, 
    withStyles } from "@material-ui/core";
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
        flex: "1 1 400px",
        backgroundSize: "contain"
    },
    cardContent: {
        flex: "1 0 auto",
        padding: 0,
        width: "100%",
    },
    cardLink: {
        textDecoration: "none",
        color: orange[900] 
    },
    divider: {
        width: "100%"
    },
    expansion: {
        display: "flex",
        flexDirection: "column",
        boxShadow: "none !important"
    },
    panelSummary: {
        alignSelf: "center"
    },
    title: {
        padding: "0px !important"
    },
    panelDetails: {
        flexDirection: "column"
    }
};

function RecipeCard(props){
    const { classes, recipe } = props;
    const totalCarb = Math.floor(recipe.totalNutrients.CHOCDF.quantity / recipe.yield);
    const fiber = Math.floor(recipe.totalNutrients.FIBTG.quantity / recipe.yield);
    const netCarb = totalCarb - fiber;
    return(
        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.container }>
            <Card className={ classes.card }>
                <CardMedia image={ recipe.image } className={ classes.recipeImage }/>
                <CardContent className={ classes.cardContent }>
                    <ExpansionPanel className={ classes.expansion }>
                        <ExpansionPanelSummary classes={ { root: classes.panelSummary } }>
                            <Typography variant="title" className={ classes.title }>{ recipe.label }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={ classes.panelDetails }>
                            <Typography variant="title">Nutrition Facts</Typography>
                            <Typography variant="subtitle1">Servings: { recipe.yield }</Typography>
                            <Typography variant="subtitle2">Per Serving: </Typography>
                            <Typography>Calories: { Math.floor(recipe.calories / recipe.yield) } kcal</Typography>
                            <Typography>Fat: { Math.floor(recipe.totalNutrients.FAT.quantity / recipe.yield) } g</Typography>
                            <Typography>Protein: { Math.floor(recipe.totalNutrients.PROCNT.quantity / recipe.yield) } g</Typography>
                            <Typography>Total Carb: { totalCarb } g</Typography>
                            <Typography>Fiber: { fiber } g</Typography>
                            <Typography>Net Carb: { netCarb } g</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
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
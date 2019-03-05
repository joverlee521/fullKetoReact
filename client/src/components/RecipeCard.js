import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Card, CardMedia, CardContent, CardActions, 
    Button, Typography, Divider, 
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, 
    Icon, IconButton,
    withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import API from "../utils/API";

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
        height: "100%",
        position: "relative"
    },
    recipeImage: {
        width: "100%",
        flex: "1 1 400px",
        backgroundSize: "auto 100%",
        borderBottom: "1px solid rgba(0,0,0,0.08)"
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
        alignSelf: "stretch"
    },
    panelSumContent: {
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    panelDetails: {
        flexDirection: "column"
    },
    favoriteBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: orange[800],
        color: "#fff",
        margin: 5,
        "&:hover": {
            backgroundColor: orange[200],
            color: orange[900]
        }
    }
};

class RecipeCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            favorite: false, 
            id: null
        }
        this.recipe = {}
    }

    componentWillMount(){
        const { user, recipe, externalRecipe } = this.props;
        if(externalRecipe){
            this.extractExternalRecipe(externalRecipe, user);
            if(user.favoriteEdamamRecipes && user.favoriteEdamamRecipes.indexOf(externalRecipe.uri) >= 0){
                this.setState({ favorite: true });
            }
        }
        else if(recipe){
            if(user.favoriteEdamamRecipes && user.favoriteEdamamRecipes.indexOf(recipe.uri) >= 0){
                this.setState({ favorite: true})
            }
            this.recipe = recipe;
        }
    }

    extractExternalRecipe = (externalRecipe, user) => {
        let fiber;
        if(externalRecipe.totalNutrients.FIBTG){
            fiber = Math.round(externalRecipe.totalNutrients.FIBTG.quantity / externalRecipe.yield);
        }
        else{
            fiber = 0;
        }
        this.recipe = {
            title: externalRecipe.label,
            image: externalRecipe.image,
            servings: externalRecipe.yield,
            calories: Math.round(externalRecipe.calories / externalRecipe.yield),
            fat: Math.round(externalRecipe.totalNutrients.FAT.quantity / externalRecipe.yield),
            protein: Math.round(externalRecipe.totalNutrients.PROCNT.quantity / externalRecipe.yield),
            carbs: Math.round(externalRecipe.totalNutrients.CHOCDF.quantity / externalRecipe.yield),
            fiber: fiber,
            source: externalRecipe.source,
            url: externalRecipe.url,
            uri: externalRecipe.uri
        }
        if(user){
            this.recipe.UserId = user.id;
        }
    }

    addToFavorites = () => {
        const { user } = this.props;
        if(user.favoriteEdamamRecipes.length === 1 && user.favoriteEdamamRecipes[0] === ""){
            user.favoriteEdamamRecipes = [this.recipe.uri];
        }
        else{
            user.favoriteEdamamRecipes.push(this.recipe.uri);
        }
        Promise.all([API.updateUser(user.id, { favoriteEdamamRecipes: user.favoriteEdamamRecipes.join(";") }), API.saveExternalRecipe(this.recipe)])
        .then(res => this.setState({ favorite: true }))
        .catch(err => console.log(err));
    }

    removeFromFavorites = () => {
        const { user, recipe } = this.props;
        const index = user.favoriteEdamamRecipes.indexOf(recipe.uri);
        user.favoriteEdamamRecipes.splice(index, 1);
        const recipeUri = recipe.uri.split("_");
        Promise.all([API.updateUser(user.id, { favoriteEdamamRecipes: user.favoriteEdamamRecipes.joing(";") }), API.deleteExternalRecipe(user.id, recipeUri[1])])
        .then(() => this.setState({ favorite: false }, () => {
            if(this.props.updateRecipes){
                this.props.updateRecipes();
            }
        }))
        .catch(err => console.log(err));
    }

    render(){
        const { classes, loggedIn } = this.props;

        return(
            <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.container }>
                <Card className={ classes.card }>
                    <CardMedia image={ this.recipe.image } className={ classes.recipeImage }/>
                    { loggedIn && <IconButton onClick={ this.state.favorite ? this.removeFromFavorites : this.addToFavorites } className={ classes.favoriteBtn }><Icon>{ this.state.favorite ? "favorite" : "favorite_border" }</Icon></IconButton> }
                    <CardContent className={ classes.cardContent }>
                        <ExpansionPanel className={ classes.expansion }>
                            <ExpansionPanelSummary classes={{ root: classes.panelSummary, content: classes.panelSumContent }} expandIcon={<Icon>expand_more</Icon>}>
                                <Typography variant="title">{ this.recipe.title }</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={ classes.panelDetails }>
                                <Typography variant="title">Nutrition Facts</Typography>
                                <Typography variant="subtitle1">Servings: { this.recipe.servings }</Typography>
                                <Typography variant="subtitle2">Per Serving: </Typography>
                                <Typography>Calories: { this.recipe.calories } kcal</Typography>
                                <Typography>Fat: { this.recipe.fat } g</Typography>
                                <Typography>Protein: { this.recipe.protein } g</Typography>
                                <Typography>Total Carb: { this.recipe.carbs } g</Typography>
                                <Typography>Fiber: { this.recipe.fiber } g</Typography>
                                <Typography>Net Carb: { Math.round(this.recipe.carbs - this.recipe.fiber) } g</Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </CardContent>
                    <Divider className={ classes.divider } light/>
                    <CardActions>
                        <Button>
                            <a className={ classes.cardLink } href={ this.recipe.url } rel="noopener noreferrer" target="_blank">{ this.recipe.source }</a>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
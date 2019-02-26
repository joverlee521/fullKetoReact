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
    }

    componentWillMount(){
        const { user, recipe } = this.props;
        if(user.favoriteEdamamRecipes.indexOf(recipe.uri) >= 0){
            this.setState({ favorite: true });
        }
    }

    calcCarbs = () => {
        const { recipe } = this.props;
        const totalCarb = Math.floor(recipe.totalNutrients.CHOCDF.quantity / recipe.yield);
        let fiber;
        if(recipe.totalNutrients.FIBTG){
            fiber = Math.floor(recipe.totalNutrients.FIBTG.quantity / recipe.yield);
        } 
        else{
            fiber = 0;
        }
        const netCarb = totalCarb - fiber;
        return ({
            totalCarb: totalCarb,
            fiber: fiber,
            netCarb: netCarb
        });
    }

    addToFavorites = () => {
        const { user, recipe } = this.props;
        if(user.favoriteEdamamRecipes.length === 1 && user.favoriteEdamamRecipes[0] === ""){
            user.favoriteEdamamRecipes = [recipe.uri];
        }
        else{
            user.favoriteEdamamRecipes.push(recipe.uri);
        }
        const recipeObj = {
            label: recipe.label,
            image: recipe.image,
            yield: recipe.yield,
            calories: recipe.calories,
            totalNutrients: recipe.totalNutrients,
            source: recipe.source,
            url: recipe.url,
            uri: recipe.uri,
            UserId: user.id
        }
        Promise.all([API.updateUser(user.id, { favoriteEdamamRecipes: user.favoriteEdamamRecipes }), API.saveExternalRecipe(recipeObj)])
        .then(res => this.setState({ favorite: true }))
        .catch(err => console.log(err));
    }

    removeFromFavorites = () => {
        const { user, recipe } = this.props;
        const index = user.favoriteEdamamRecipes.indexOf(recipe.uri);
        user.favoriteEdamamRecipes.splice(index, 1);
        const recipeUri = recipe.uri.split("_");
        Promise.all([API.updateUser(user.id, { favoriteEdamamRecipes: user.favoriteEdamamRecipes }), API.deleteExternalRecipe(user.id, recipeUri[1])])
        .then(() => this.setState({ favorite: false }))
        .catch(err => console.log(err));
    }

    render(){
        const { classes, recipe, loggedIn } = this.props;
        const { totalCarb, fiber, netCarb } = this.calcCarbs();
        return(
            <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } className={ classes.container }>
                <Card className={ classes.card }>
                    <CardMedia image={ recipe.image } className={ classes.recipeImage }/>
                    { loggedIn && <IconButton onClick={ this.state.favorite ? this.removeFromFavorites : this.addToFavorites } className={ classes.favoriteBtn }><Icon>{ this.state.favorite ? "favorite" : "favorite_border" }</Icon></IconButton> }
                    <CardContent className={ classes.cardContent }>
                        <ExpansionPanel className={ classes.expansion }>
                            <ExpansionPanelSummary classes={{ root: classes.panelSummary, content: classes.panelSumContent }} expandIcon={<Icon>expand_more</Icon>}>
                                <Typography variant="title">{ recipe.label }</Typography>
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
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeCard);
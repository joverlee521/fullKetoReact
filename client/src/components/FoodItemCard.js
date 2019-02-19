import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
    container: {
        margin: "0vh 5vw 5vh",
        [theme.breakpoints.up("md")]: {
            margin: "0vh 10vw 10vh"
        },
        
        flex: "1 0 auto"
    },
    card: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        textAlign: "justify"
    },
    foodImage : {
        height: 150,
        width: 150,
        backgroundSize: "contain",
        margin: 10
    },
    redText: {
        color: "red"
    },
    greenText: {
        color: "green"
    }
});

function FoodItemCard(props){
    const { classes, foodObj } = props;
    const { food_name, serving_weight_grams, full_nutrients, photo } = foodObj;
    let totalCarb = 0;
    let fiber = 0;
    let netCarb = 0;
    for(var j = 0; j < full_nutrients.length; j++){
        if(full_nutrients[j].attr_id === 205){
            totalCarb = full_nutrients[j].value.toFixed(2);
        }
        if(full_nutrients[j].attr_id === 291){
            fiber = full_nutrients[j].value.toFixed(2);
        }
    }
    if(fiber !== undefined){
        netCarb = (totalCarb - fiber).toFixed(2);
    }
    else{
        netCarb = totalCarb;
    }
    return(
        <Grid item className={ classes.container }>
            <Card className={ classes.card }>
                <CardMedia className={ classes.foodImage } image={ photo.thumb }/>
                <CardContent>
                    <Typography variant="h6">Food Name: { food_name }</Typography>
                    <Typography variant="h6">Serving Size: { serving_weight_grams } grams</Typography>
                    <Typography variant="h6">Net Carbs: { netCarb } grams</Typography>
                </CardContent>
                <CardContent>
                    <Typography variant="h5">
                        Is it Keto? <span className={ netCarb < 20 ? classes.greenText : classes.redText }>{ netCarb < 20 ? "YES!" : "NO!" }</span>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default withStyles(styles)(FoodItemCard);
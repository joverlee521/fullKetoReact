import React from "react";
import { Card, CardContent, CardMedia, Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
    container: {
        display: "flex",
        margin: "0vh 0vw 10vh",
        [theme.breakpoints.up("md")]: {
            margin: "0vh 10vw 10vh"
        },
        justifyContent: "space-between",
        alignItems: "center",
        flex: "1 0 auto"
    },
    foodImage : {
        height: 150,
        width: 150
    }
});

function FoodItemCard(props){
    const { classes, foodObj } = props;
    const { food_name, serving_unit, full_nutrients, photo } = foodObj;
    let totalCarb = 0;
    let fiber = 0;
    let netCarb = 0;
    let ketoStatus = false;
    for(var j = 0; j < full_nutrients.length; j++){
        if(full_nutrients[j].attr_id == 205){
            totalCarb = full_nutrients[j].value.toFixed(2);
        }
        if(full_nutrients[j].attr_id == 291){
            fiber = full_nutrients[j].value.toFixed(2);
        }
    }
    if(fiber !== undefined){
        netCarb = (totalCarb - fiber).toFixed(2);
    }
    else{
        netCarb = totalCarb;
    }
    if(netCarb < 20){
        ketoStatus = true;
    }
    return(
        <Card className={ classes.container }>
            <CardMedia className={ classes.foodImage } image={ photo.thumb }/>
            <CardContent>
                <Typography variant="h6">Food Name: { food_name }</Typography>
                <Typography variant="h6">Serving Size: { serving_unit }</Typography>
                <Typography variant="h6">Net Carbs: { netCarb } grams</Typography>
            </CardContent>
            <CardContent>
                <Typography variant="h5">Keto status: { ketoStatus ? "YES!" : "NO!" }</Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(FoodItemCard);
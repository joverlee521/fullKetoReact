import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Icon, MenuItem, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const units = ["tsp", "Tbsp", "cup", "mL","oz", "g"];
const styles = {
    container: {
        position: "relative",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: 20,
        padding: 20,
        margin: "10px 0px"
    },
    closeBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 5,
        color: deepOrange[900],
        "&:hover": {
            color: "#fff",
            backgroundColor: deepOrange[600]
        }
    }
}

function IngredientInput(props){
    const { classes } = props;
    return(
        <Grid container item justify="space-evenly" alignContent="center" className={ classes.container }>
            <IconButton onClick={ () => props.delete(props.index, "ingredients") } className={ classes.closeBtn }>
                <Icon>close</Icon>
            </IconButton>
            <Grid item xs={ 12 } md={ 6 }>
                <TextField
                    label="Ingredient Name"
                    name={ `name-${props.index}` }
                    value={ props.name }
                    onChange={ props.onChange }
                    variant="outlined"
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={ 6 } md={ 3 }>
                <TextField
                    label="Amount"
                    name={ `amount-${props.index}` }
                    value={ props.amount }
                    onChange={ props.onChange }
                    variant="outlined"
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={ 6 } md={ 3 }>
                <TextField
                    label="Unit"
                    name={ `unit-${props.index}` }
                    value={ props.unit }
                    onChange={ props.onChange }
                    variant="outlined"
                    fullWidth
                    required
                    select
                >
                    { units.map((unit, index) => (
                        <MenuItem key={ index } value={ unit }>{ unit }</MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    )
}

IngredientInput.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IngredientInput);
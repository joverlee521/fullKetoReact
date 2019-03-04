import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Icon, MenuItem, withStyles } from "@material-ui/core";
import styles from "./Styles";

const units = ["tsp", "Tbsp", "cup", "mL","oz", "gram"];

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
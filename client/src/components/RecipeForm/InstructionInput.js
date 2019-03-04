import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Icon, withStyles } from "@material-ui/core";
import styles from "./Styles";

function InstructionInput(props){
    const { classes } = props;
    return(
        <Grid container item justify="space-evenly" alignContent="center" className={ classes.container }>
            <IconButton onClick={ () => props.delete(props.index, "instructions") } className={ classes.closeBtn }>
                <Icon>close</Icon>
            </IconButton>
            <Grid item xs={ 12 }>
                <TextField
                    label={ `Step ${props.index + 1}`}
                    name={ props.index.toString() }
                    value={ props.value }
                    onChange={ props.onChange }
                    variant="outlined"
                    fullWidth
                    multiline
                    required
                />
            </Grid>
        </Grid>
    )
}

InstructionInput.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InstructionInput);
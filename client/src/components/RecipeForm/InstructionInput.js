import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, IconButton, Icon, MenuItem, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

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
                    name={ props.index }
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
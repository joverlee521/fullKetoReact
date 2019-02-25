import React from "react";
import PropTypes from "prop-types";
import { Grid, CircularProgress, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const styles = {
    container: {
        flex: "1 1 auto",
        marginTop: -100
    },
    progress: {
        color: deepOrange[900]
    }
};

function Progress(props){
    const { classes } = props;
    return(
        <Grid container item justify="center" alignItems="center" className={ classes.container }>
            <CircularProgress className={ classes.progress }/>
        </Grid>
    );
}

Progress.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Progress);
import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon, Button, withStyles } from "@material-ui/core";

const styles = {
    container: {
        flex: "1 0 auto",
        padding: 40
    }
};

function DeleteAccountBtn(props){
    const { classes } = props;
    return(
        <Grid container item justify="center" alignContent="center" className={ classes.container }>
            <Button color="secondary" variant="contained" onClick={ props.delete }>
                <Icon>delete</Icon>
                Delete Account
            </Button>
        </Grid>
    );
}

DeleteAccountBtn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteAccountBtn);
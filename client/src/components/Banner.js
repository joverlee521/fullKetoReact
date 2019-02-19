import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import BannerBackground from "../images/banner_background.jpeg";

const styles = {
    banner: {
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3), 
            rgba(0, 0, 0, 0.3)
          ), url(${BannerBackground})`,
        backgroundSize: "cover",
        height: "25vh",
        color: "#fff",
        flex: "0 1 auto"
    }
};

function Banner(props){
    const { classes } = props;
    return(
        <Grid container alignItems="center" justify="center" className={ classes.banner }>
            <Grid item>
                <Typography color="inherit" variant="display3">{ props.title }</Typography>
            </Grid>
        </Grid>
    );
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);
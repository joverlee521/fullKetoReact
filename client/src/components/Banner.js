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
        color: "#fff",
        flex: "1 0 auto"
    },
    centerText: {
        textAlign: "center"
    }
};

function Banner(props){
    const { classes } = props;
    return(
        <Grid container item alignItems="center" justify="center" className={ classes.banner }>
            <Grid item>
                <Typography color="inherit" variant="display3" className={ classes.centerText }>{ props.title }</Typography>
                { props.subtitle && <Typography color="inherit" variant="subheading" className={ classes.centerText }>{ props.subtitle }</Typography>}
            </Grid>
        </Grid>
    );
}

Banner.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Banner);
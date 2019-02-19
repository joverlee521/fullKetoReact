import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import FooterBackground from "../images/footer_background.jpeg";
import NutritionixBadge from "../images/NutritionixAPI_hires_flat.png";

const styles = {
    footer: {
        paddingTop: 15,
        background: `linear-gradient(
            rgba(0, 0, 0, 0.3), 
            rgba(0, 0, 0, 0.3)
          ), url(${FooterBackground})`,
        backgroundSize: "cover",
        color: "#fff",
        flex: "0 1 auto"
    },
    nutritionixBadge: {
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "#fff",
        borderRadius: 5
    },
    copyright: {
        background: `linear-gradient(
            rgba(0, 0, 0, 0.1), 
            rgba(0, 0, 0, 0.1)
          )`
    },
    copyrightText: {
        margin: 5
    }
}

function Footer(props){
    const { classes } = props;
    return(
        <Grid container className={ classes.footer } spacing={8}>
            <Grid container item>
                <Grid container item direction="column" xs={6} justify="center" alignItems="center" spacing={8}>
                    <Grid item>
                        <Typography variant="h5" color="inherit">
                            Our Mission
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading" color="inherit" gutterBottom>
                            Make Keto easier!
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item direction="column" xs={6} alignItems="center">
                    <Grid item>
                        <div id="edamam-badge" data-color="white"></div>
                    </Grid>
                    <Grid item>
                        <img src={NutritionixBadge} alt="Nutritionix Badge" width="200" className={ classes.nutritionixBadge }></img>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item justify="center" alignContent="center" className={ classes.copyright }>
                <Typography color="inherit" className={ classes.copyrightText }>
                    © 2019 Jover Lee
                </Typography>
            </Grid>
        </Grid>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
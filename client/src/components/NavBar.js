import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Button, withStyles, Grid } from "@material-ui/core";
import { deepOrange, orange } from "@material-ui/core/colors";

const styles = theme => ({
    appBar: {
        top: 0,
        background: orange[800],
    },
    grow: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    loginBtn: {
        color: theme.palette.getContrastText(orange[300]),
        backgroundColor: orange[300],
        "&:hover":{
            backgroundColor: orange[50]
        }
    },
    navLink: {
        color: theme.palette.getContrastText(orange[800]),
        "&:hover": {
            backgroundColor: orange[800]
        }
    },
    activeNavLink: {
        color: theme.palette.getContrastText(orange[800]),
        backgroundColor: orange[900],
        border: "2px solid",
        borderColor: "white"
    }
});

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <AppBar position="fixed" className={ classes.appBar }>
                <Toolbar>
                    <Grid container spacing={32} alignItems="center">
                        <Grid item>
                            <Button color="inherit" component={ Link } to="/" className={ classes.navLink }>
                                <Typography variant="h5" color="inherit">
                                    Full Keto
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={ Link } to="/isitketo" 
                                className={ window.location.pathname === "/isitketo" ? classes.activeNavLink : classes.navLink }>
                                Is it Keto?
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={ Link } to="/recipes" 
                                className={ window.location.pathname === "/recipes" ? classes.activeNavLink : classes.navLink }>
                                Recipes
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={ Link } to="/mealplanner" 
                                className={ window.location.pathname === "/mealplanner" ? classes.activeNavLink : classes.navLink }>
                                Meal Planner
                            </Button>
                        </Grid>
                        <Grid item className={ classes.grow }>
                            <Button variant="contained" className={ classes.loginBtn }>
                                { this.props.loggedIn ? "Logout" : "Login" }
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    } 
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
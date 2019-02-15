import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { AppBar, Toolbar, Typography, Button, withStyles, Grid, Hidden, IconButton, Icon, Menu, MenuItem } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import GoogleSignIn from "../images/btn_google_signin_light_normal_web.png";

const styles = theme => ({
    appBar: {
        background: orange[800],
    },
    grow: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-end"
    },
    logoutBtn: {
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
        border: "2px solid",
        borderColor: "white"
    }
});

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    // Handles clicking on the menu icon
    handleClick = event => {
        // Sets the anchor for the Menu to the menu icon
        this.setState({ anchorEl: event.currentTarget });
    }

    // Handles closing of the menu 
    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render(){
        const { classes } = this.props;
        const { anchorEl } = this.state;

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
                        {/* Nav links are hidden on small screens and down */}
                        <Hidden smDown>
                            <Grid item>
                                <Button component={ Link } to="/isitketo" 
                                    // Conditionally joining classNames via the classnames package
                                    className={ classNames(classes.navLink, { [classes.activeNavLink]: window.location.pathname === "/isitketo" }) }>
                                    Is it Keto?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component={ Link } to="/recipes" 
                                    className={ classNames(classes.navLink, { [classes.activeNavLink]: window.location.pathname === "/recipes" }) }>
                                    Recipes
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component={ Link } to="/mealplanner" 
                                    className={ classNames(classes.navLink, { [classes.activeNavLink]: window.location.pathname === "/mealplanner" }) }>
                                    Meal Planner
                                </Button>
                            </Grid>
                            <Grid item className={ classes.grow }>
                                { this.props.loggedIn ? 
                                    <a href="/auth/logout">
                                        <Button variant="contained" className={ classes.logoutBtn }>
                                            Logout
                                        </Button>
                                    </a>
                                    // Must use anchor tag to access Google log in (does not work with axios)
                                    : <a href="/auth/login"> 
                                        <img src={ GoogleSignIn } width="160" height="auto" alt="Sign in with Google" />
                                    </a>
                                }
                            </Grid>
                        </Hidden>
                        {/* Menu icon is hidden on medium screens and up */}
                        <Hidden mdUp>
                            <Grid item className={ classes.grow }>
                                <IconButton color="inherit" aria-label="Menu" onClick={ this.handleClick }>
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Grid>
                            {/* Menu is open when the anchorEl returns a truthy value */}
                            <Menu anchorEl={ anchorEl } open={Boolean(anchorEl)} disableAutoFocusItem={true} onClose={ this.handleClose }>
                                <MenuItem component={ Link } to="/isitketo" onClick={ this.handleClose }>
                                    Is it Keto?
                                </MenuItem>
                                <MenuItem component={ Link } to="/recipes" onClick={ this.handleClose }>
                                    Recipes
                                </MenuItem>
                                <MenuItem component={ Link } to="/mealplanner" onClick={ this.handleClose }>
                                    Meal Planner
                                </MenuItem>
                                { this.props.loggedIn ? 
                                    <a href="/auth/logout">
                                        <MenuItem onClick={ this.handleClose }>
                                            Logout
                                        </MenuItem>
                                    </a>
                                    : <a href="/auth/login">
                                        <MenuItem onClick={ this.handleClose }>
                                            <img src={ GoogleSignIn } width="160" height="auto" alt="Sign in with Google" />
                                        </MenuItem>
                                    </a>
                                }
                            </Menu>
                        </Hidden>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    } 
}

// Typechecking on the props of the component
NavBar.propTypes = {
    // Component expects a prop 'classes' that is an object and is a Required prop
    classes: PropTypes.object.isRequired,
};

// Using withStyles to inject custom styles
// passes the "classes" prop to the component
export default withStyles(styles)(NavBar);
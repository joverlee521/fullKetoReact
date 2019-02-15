import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Button, withStyles, Grid, Hidden, IconButton, Icon, Menu, MenuItem } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import GoogleSignIn from "../images/btn_google_signin_light_normal_web.png";

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
            anchorEl: null
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }

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
                        <Hidden smDown>
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
                                { this.props.loggedIn ? 
                                    <a href="/auth/logout">
                                        <Button variant="contained" className={ classes.loginBtn }>
                                            Logout
                                        </Button>
                                    </a>
                                    : <a href="/auth/login">
                                        <img src={ GoogleSignIn } width="160" height="auto" alt="Sign in with Google" />
                                    </a>
                                }
                            </Grid>
                        </Hidden>
                        <Hidden mdUp>
                            <Grid item className={ classes.grow }>
                                <IconButton color="inherit" aria-label="Menu" onClick={ this.handleClick }>
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Grid>
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
                                <a href={ this.props.loggedIn ? "/auth/logout" : "/auth/login" } >
                                <MenuItem onClick={ this.handleClose }>
                                    { this.props.loggedIn ? "Logout" : "Login" }
                                </MenuItem>
                                </a>
                            </Menu>
                        </Hidden>
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
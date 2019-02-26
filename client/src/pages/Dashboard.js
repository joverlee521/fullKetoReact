import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Icon, Tabs, Tab, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import API from "../utils/API";

const styles = {
    tabContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        color: deepOrange[900]
    }
};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0
        }
    }

    changeTabs = (event, value) => {
        this.setState({ value });
    }

    render(){
        const { classes } = this.props;
        return(
            <Grid container direction="column" className="container">
                <Banner title={`${this.props.user.username}'s Dashboard`} />
                <Paper className={ classes.tabContainer }>
                    <Tabs value={ this.state.value } onChange={ this.changeTabs } variant="fullWidth" centered>
                        <Tab label="Account" icon={ <Icon>account_circle</Icon> }/>
                        <Tab label="Favorites" icon={ <Icon>favorite</Icon> }/>
                        <Tab label="My Recipes" icon={ <Icon>receipt</Icon> }/>
                    </Tabs>
                </Paper>
                { this.state.value === 0 &&  <Typography>Account</Typography> }
                { this.state.value === 1 &&  <Typography>Favorites</Typography> }
                { this.state.value === 2 &&  <Typography>My Recipes</Typography> }
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
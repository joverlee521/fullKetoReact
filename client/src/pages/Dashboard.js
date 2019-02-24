import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, withStyles } from "@material-ui/core";
import Banner from "../components/Banner";

const styles = {

};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        this.setState({ user: this.props.user });
    }
    
    render(){
        return(
            <Grid container direction="column" className="container">
                <Banner title={`${this.state.user.username}'s Dashboard`} />
                <Grid container item justify="center" alignContent="center">
                    <Typography>Dashboard</Typography>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
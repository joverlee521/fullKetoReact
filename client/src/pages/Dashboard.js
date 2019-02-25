import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import Banner from "../components/Banner";
import API from "../utils/API";

const styles = {

};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    changeUsername = () => {
        API.updateUser("2", {favoriteEdamamRecipe: "jojo"})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render(){
        return(
            <Grid container direction="column" className="container">
                <Banner title={`${this.props.user.username}'s Dashboard`} />
                <Grid container item justify="center" alignContent="center">
                    <Typography>Dashboard</Typography>
                    <Button onClick={ this.changeUsername }>Change Name</Button>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
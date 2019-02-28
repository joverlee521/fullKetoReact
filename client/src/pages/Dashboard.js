import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Paper, Typography, Icon, Tabs, Tab, withStyles } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import Banner from "../components/Banner";
import UsernameForm from "../components/UsernameForm";
import DeleteAccountBtn from "../components/DeleteAccountBtn";
import FavoriteRecipeDisplay from "../components/FavoriteRecipeDisplay";
import Modal from "../components/Modal";
import API from "../utils/API";

const styles = {
    tabContainer: {
        color: deepOrange[900]
    },
    accoutContainer: {
        flex: "4 0 auto"
    }
};

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 0,
            openModal: false
        }
    }

    changeTabs = (event, value) => {
        this.setState({ value });
    }

    openConfirmationModal = () => {
        this.setState({ openModal: true });
    }

    closeModal = () => {
        this.setState({ openModal: false });
    }

    deleteAccount = () => {
        const { user } = this.props;
        Promise.all([API.deleteUser(user.id), API.deleteAllUserFavoriteRecipes(user.id)])
        .then(() => window.location.reload())
        .catch(error => console.log(error));
    }

    deleteAccountAndRecipes = () => {
        const { user } = this.props;
        Promise.all([API.deleteUser(user.id), API.deleteAllUserFavoriteRecipes(user.id), API.deleteAllUserRecipes(user.id)])
        .then(() => window.location.reload())
        .catch(error => console.log(error));
    }
 
    render(){
        const { classes, user } = this.props;
        return(
            <Grid container direction="column" className="container">
                <Banner title={`${user.username}'s Dashboard`} />
                <Paper className={ classes.tabContainer }>
                    <Tabs value={ this.state.value } onChange={ this.changeTabs } variant="fullWidth" centered>
                        <Tab label="Account" icon={ <Icon>account_circle</Icon> }/>
                        <Tab label="Favorites" icon={ <Icon>favorite</Icon> }/>
                        <Tab label="My Recipes" icon={ <Icon>receipt</Icon> }/>
                    </Tabs>
                </Paper>
                { this.state.value === 0 &&  
                    <Grid container item direction="column" className={ classes.accoutContainer }>
                        <UsernameForm user={ user } updateUser={ this.props.updateUser }/>
                        <DeleteAccountBtn delete={ this.openConfirmationModal } />
                    </Grid>
                }
                { this.state.value === 1 &&  <FavoriteRecipeDisplay user={ user }/> }
                { this.state.value === 2 &&  <Typography>My Recipes</Typography> }
                <Modal open={ this.state.openModal } 
                    title="Are You Sure?" 
                    message="We are very sorry to see you go! Do you want to delete all of your recipes as well or keep the recipes with an Anonymous author?" 
                    close={ this.closeModal }
                    firstBtn="Delete all recipes"
                    firstFunc={ this.deleteAccountAndRecipes }
                    secondFunc={ this.deleteAccount }
                    secondBtn="Keep the recipes"
                    closeBtn="Cancel"/>
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Dashboard);
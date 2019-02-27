import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, IconButton, Icon, Button, Typography, TextField, withStyles } from "@material-ui/core";
import API from "../utils/API";

const styles = {
    container: {
        flex: "2 0 auto",
        padding: 20
    },
    label: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 10
    },
    editLabel: {
        justifyContent: "center !important"
    },
    editBtn: {
        padding: "0px 5px",
        marginLeft: 10
    },
    form: {
        position: "relative",
        top: 20,
        justifyContent: "center"
    },
    formBtn: {
        margin: 10
    },
    saveBtn: {
        backgroundColor: "green"
    }
};

class UsernameForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit: false,
            user: {},
            input: ""
        }
    }

    componentWillMount(){
        this.setState({ user: this.props.user, input: this.props.user.username });
    }

    editUsername = () => {
        this.setState({ edit: true });
    }

    cancelEdit = () => {
        this.setState({ edit: false, input: this.state.user.username });
    }

    handleChange = event => {
        this.setState({ input: event.target.value });
    }

    saveUsername = () => {
        const { user, input } = this.state;
        API.updateUser(user.id, { username: input })
        .then(res => this.setState({ user: res.data, edit: false }, () => this.props.updateUser(res.data)))
        .catch(error => console.log(user));
    }

    render(){
        const { classes } = this.props;
        return(
            <Grid container item justify="center" alignContent="center" className={ classes.container }>
                <Grid item xs={ this.state.edit ? 12 : 6 } className={ classNames(classes.label, { [classes.editLabel]: this.state.edit }) }>
                    <Typography variant="h6">Username: </Typography>
                </Grid>
                <Grid item xs={ this.state.edit ? 8 : 6 } >
                    { this.state.edit ? 
                        <Grid container item component="form" className={ classes.form }>
                            <Grid item xs={ 12 } md={ 6 }>
                                <TextField value={ this.state.input } fullWidth variant="outlined" onChange={ this.handleChange }/>
                            </Grid>
                            <Button variant="contained" className={ classNames(classes.formBtn, classes.saveBtn) } onClick={ this.saveUsername } color="primary">Save</Button>
                            <Button variant="contained" className={ classes.formBtn } onClick={ this.cancelEdit } color="secondary">Cancel</Button>
                        </Grid>
                        : <Grid container item>
                            <Typography variant="h6">{ this.state.user.username }</Typography>
                            <IconButton className={ classes.editBtn } onClick={ this.editUsername }><Icon>edit</Icon></IconButton>
                        </Grid>
                    }
                </Grid>
            </Grid>
        );
    }
}

UsernameForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UsernameForm);
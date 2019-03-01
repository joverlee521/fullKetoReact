import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, TextField, withStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const styles = {
    container: {
        flex: "2 0 auto",
        padding: 10
    }
};

const theme = createMuiTheme({
    palette: {
      primary: deepOrange,
    },
    typography: { useNextVariants: true },
});

class RecipeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        const{ classes } = this.props;
        return(
            <Grid container item component="form" justify="center" className={ classes.container }>
                <MuiThemeProvider theme={ theme }>
                    <TextField 
                        label="Recipe Title" 
                        name="title"
                        value={ this.state.title } 
                        onChange={ this.handleInput }
                        variant="outlined" 
                        fullWidth 
                        required
                    />
                </MuiThemeProvider>
            </Grid>
        );
    }
}

RecipeForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecipeForm);
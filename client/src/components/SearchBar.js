import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button, FormControl, Input, InputAdornment, Icon, withStyles } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const styles = {
    container: {
        flex: "2 1 auto",
        padding: "20px 10px"
    },
    underline: {
        borderBottom: `1px solid ${orange[900]} !important`,
        "&:hover:before": {
            borderBottom: `2px solid ${orange[900]} !important`
        },
        "&:after": {
            borderBottom: `2px solid ${orange[800]} !important`
        }
    },
    searchButton: {
        margin: 5,
        backgroundColor: orange[900],
        color: "#fff",
        "&:hover": {
            backgroundColor: orange[400]
        }
    }
};

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            input: ""
        }
    };

    // TODO: Delete input when `Get Random Recipes` Button is clicked
    handleInput = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    formSubmit = event => {
        event.preventDefault();
        const { input } = this.state;
        this.props.search(input);
    }

    render(){
        const { classes, placeholder } = this.props
        return(
            <Grid container item component={"form"} alignItems="center" justify="center" onSubmit={this.formSubmit} className={ classes.container }>
                <Grid item xs={ 8 }>
                    <FormControl fullWidth>
                        <Input
                          id="search-bar"
                          name="input"
                          value={this.state.input}
                          onChange={this.handleInput}
                          required
                          placeholder={ placeholder }
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon>search</Icon>
                            </InputAdornment>
                          }
                          className={ classes.underline }
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" type="submit" className={ classes.searchButton }>
                        Search
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchBar);
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button, FormControl, InputLabel, Input, InputAdornment, Icon, withStyles } from "@material-ui/core";
import { brown } from "@material-ui/core/colors";

const styles = {
    grow: {
        flex: 1
    },
    underline: {
        borderBottom: "1px solid #482311 !important",
        "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: "2px solid #482311 !important"
        }
    },
    searchButton: {
        backgroundColor: brown[900],
        color: "#fff",
        "&:hover": {
            backgroundColor: brown[400]
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
            <Grid container component={"form"} spacing={8} alignItems="center" justify="center" onSubmit={this.formSubmit} className={ classes.grow }>
                <Grid item xs={8}>
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
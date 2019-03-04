import React, { Component } from "react";
import { Grid, TextField, InputAdornment, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
      primary: deepOrange,
    },
    typography: { useNextVariants: true },
    overrides: {
        MuiGrid: {
            container: {
                flex: "2 0 auto",
                padding: 10,
                "@media (min-width: 600px)": {
                    padding: "10px 30px"
                },
                "@media (min-width: 960px)": {
                    padding: "10px 60px"
                }
            }
        },
        MuiFormControl: {
            root: {
                boxSizing: "border-box",
                padding: 5 
            }
        },
        MuiInputBase: {
            fullWidth: {
                boxSizing: "border-box"
            }
        }
    }
});

class RecipeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            servings: "",
            servingSize: "",
            prepTime: "",
            cookTime: ""
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render(){
        return(
            <MuiThemeProvider theme={ theme }>
                <Grid container item component="form" justify="center">
                    <TextField 
                        label="Recipe Title" 
                        name="title"
                        value={ this.state.title } 
                        onChange={ this.handleInput }
                        variant="outlined" 
                        fullWidth 
                        required
                    />
                    <Grid container item justify="space-evenly" alignContent="center" style={{ padding: 0 }}>
                        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                            <TextField
                                label="Servings"
                                name="servings"
                                value={ this.state.servings }
                                onChange={ this.handleInput }
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 } md={ 3 }>
                            <TextField
                                label="Serving Size"
                                name="servingSize"
                                value={ this.state.servingSize }
                                onChange={ this.handleInput }
                                variant="outlined"
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={ 6 } md={ 3 }>
                            <TextField
                                label="Prep Time"
                                name="prepTime"
                                value={ this.state.prepTime }
                                onChange={ this.handleInput}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mins</InputAdornment>
                                }}
                            />
                        </Grid>
                        <Grid item xs={ 6 } md={ 3 }>
                            <TextField
                                label="Cook Time"
                                name="cookTime"
                                value={ this.state.cookTime }
                                onChange={ this.handleInput}
                                variant="outlined"
                                required
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mins</InputAdornment>
                                }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Description (optional)"
                        name="description"
                        value={ this.state.description }
                        onChange={ this.handleInput }
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={ 2 }
                        rowsMax={ 5 }
                    />
                </Grid>
             </MuiThemeProvider>
        );
    }
}

export default RecipeForm;
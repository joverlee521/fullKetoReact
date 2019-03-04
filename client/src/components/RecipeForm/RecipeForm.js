import React, { Component } from "react";
import { Grid, Typography, Button, TextField, InputAdornment, MuiThemeProvider } from "@material-ui/core";
import CustomTheme from "./CustomTheme";
import IngredientInput from "./IngredientInput";
import InstructionInput from "./InstructionInput";
import API from "../../utils/API";

const theme = CustomTheme();

class RecipeForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            servings: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            ingredients: [
                {
                    name: "",
                    amount: "",
                    unit: ""
                }
            ],
            instructions: [""]
        }
    }

    handleInput = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleIngredientInput = event => {
        const { name, value } = event.target;
        const nameArray = name.split("-");
        const key = nameArray[0];
        const index = nameArray[1];
        const ingredientState = this.state.ingredients;
        ingredientState[index][key] = value;
        this.setState({ ingredients: ingredientState });
    }

    addIngredient = () => {
        const ingredientState = this.state.ingredients;
        const ingredient = {
            name: "",
            amount: "",
            unit: ""
        };
        ingredientState.push(ingredient);
        this.setState({ ingredients: ingredientState });
    }

    handleInstructionInput = event => {
        const { name, value } = event.target;
        const instructionState = this.state.instructions;
        instructionState[name] = value;
        this.setState({ instructions: instructionState });
    }

    addInstruction = () => {
        const instructionState = this.state.instructions;
        const instruction = "";
        instructionState.push(instruction);
        this.setState({ instruction: instructionState });
    }

    delete = (index, state) => {
        const tempState = this.state[state];
        tempState.splice(index, 1);
        this.setState({ [state]: tempState });
    }

    submitForm = event => {
        event.preventDefault();
        const { user } = this.props;
        const recipeObj = this.state;
        recipeObj.AuthorId = user.id;
        API.postRecipe(user.id, recipeObj)
        .then(() => {
            this.props.openModal();
            this.setState({
                title: "",
                description: "",
                servings: "",
                servingSize: "",
                prepTime: "",
                cookTime: "",
                ingredients: [
                    {
                        name: "",
                        amount: "",
                        unit: ""
                    }
                ],
                instructions: [""]
            });
        })
        .catch(error => console.log(error));
    }

    render(){
        return(
            <MuiThemeProvider theme={ theme }>
                <Grid container item component="form" justify="center" onSubmit={ this.submitForm }>
                    <Grid item xs={ 12 }>
                        <TextField 
                            label="Recipe Title" 
                            name="title"
                            value={ this.state.title } 
                            onChange={ this.handleInput }
                            variant="outlined" 
                            fullWidth 
                            required
                        />
                    </Grid>
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
                    <Grid item xs={ 12 }>
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
                    <Grid container item>
                        <Typography variant="h6"><u>Ingredients</u></Typography>
                    </Grid>
                    { this.state.ingredients.map((ingredient, index) => (
                        <IngredientInput key={ index } index={ index } name={ ingredient.name } amount={ ingredient.amount } unit={ ingredient.unit } onChange={ this.handleIngredientInput } delete={ this.delete }/>
                    ))}
                    <Button color="primary" variant="contained" onClick={ this.addIngredient }>
                        Add Another Ingredient
                    </Button>
                    <Grid container item>
                        <Typography variant="h6"><u>Instructions</u></Typography>
                    </Grid>
                    { this.state.instructions.map((instruction, index) => (
                        <InstructionInput key={ index } index={ index } value={ instruction } onChange={ this.handleInstructionInput } delete={ this.delete }/>
                    ))}
                    <Button color="primary" variant="contained" onClick={ this.addInstruction }>
                        Add Another Step
                    </Button>
                    <Grid item container justify="center">
                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
             </MuiThemeProvider>
        );
    }
}

export default RecipeForm;
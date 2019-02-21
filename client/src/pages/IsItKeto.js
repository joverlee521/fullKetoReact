import React, { Component} from "react";
import { Grid } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import FoodItemCard from "../components/FoodItemCard";
import ErrorModal from "../components/ErrorModal";
import API from "../utils/API";
import "./pages.css";

class IsItKeto extends Component {
	state = {
		foodResult: null,
		error: false,
		errorMessage: ""
	};

	searchInput = input => {
		this.setState({ foodResults: null, error: false }, () => {
			API.getNutritionInfo(input)
				.then(res => {
					this.setState({ foodResult: res.data, error: false });
				})
				.catch(err => {
					if(err.response.status === 404){
						return this.setState({ foodResult: null, error: true, errorMessage: err.response.data });
					}
					return this.setState({ foodResult: null, error: true, errorMessage: "Something went wrong! Please try again!" });
				});	
		});	
	}

	render(){
		return (
			<Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
				<Banner title="Is It Keto?" subtitle="Reminder: Keep daily net carbs under 20 grams!"/>
				<SearchBar placeholder="Search food items" search={this.searchInput}/>
				{ this.state.foodResult !== null && <FoodItemCard foodObj={ this.state.foodResult }/> }
				<ErrorModal open={ this.state.error } message={ this.state.errorMessage }/>
			</Grid>
		);
	}
}

export default IsItKeto;

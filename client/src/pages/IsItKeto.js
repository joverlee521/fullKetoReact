import React, { Component} from "react";
import { Grid } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import FoodItemCard from "../components/FoodItemCard";
import ProgressCircle from "../components/Progress";
import ErrorModal from "../components/ErrorModal";
import API from "../utils/API";
import "./pages.css";

class IsItKeto extends Component {
	state = {
		foodResult: null,
		error: false,
		errorMessage: "",
		searching: false
	};

	searchInput = input => {
		this.setState({ foodResults: null, error: false, searching: true }, () => {
			API.getNutritionInfo(input)
				.then(res => {
					this.setState({ foodResult: res.data, error: false, searching: false });
				})
				.catch(err => {
					if(err.response.status === 404){
						return this.setState({ foodResult: null, error: true, errorMessage: err.response.data, searching: false });
					}
					return this.setState({ foodResult: null, error: true, errorMessage: "Something went wrong! Please try again!", searching: false });
				});	
		});	
	}

	render(){
		return (
			<Grid container direction="column" className="container">
				<Banner title="Is It Keto?" subtitle="Reminder: Keep daily net carbs under 20 grams!"/>
				<SearchBar placeholder="Search food items" search={this.searchInput}/>
				{ this.state.foodResult !== null && <FoodItemCard foodObj={ this.state.foodResult }/> }
				{ this.state.searching && <ProgressCircle /> }
				<ErrorModal open={ this.state.error } message={ this.state.errorMessage }/>
			</Grid>
		);
	}
}

export default IsItKeto;

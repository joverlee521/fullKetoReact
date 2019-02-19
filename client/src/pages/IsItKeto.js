import React, { Component} from "react";
import { Grid } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import FoodItemCard from "../components/FoodItemCard";
import API from "../utils/API";
import "./pages.css";

class IsItKeto extends Component {
	state = {
		foodResult: null
	};

	searchInput = input => {
		console.log("searching");
		API.getNutritionInfo(input)
			.then(res => {
				console.log(res.data);
				this.setState({ foodResult: res.data });
			})
			.catch(err => console.log(err));		
	}

	render(){
		return (
			<Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
				<Banner title="Is It Keto?" subtitle="Reminder: Keep daily net carbs under 20 grams!"/>
				<SearchBar placeholder="Search food items" search={this.searchInput}/>
				{ this.state.foodResult !== null && <FoodItemCard foodObj={ this.state.foodResult }/> }
			</Grid>
		);
	}
}

export default IsItKeto;

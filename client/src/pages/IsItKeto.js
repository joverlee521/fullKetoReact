import React, { Component} from "react";
import { Grid } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import API from "../utils/API";
import "./pages.css";

class IsItKeto extends Component {
	state = {
		foodResults: []
	};

	searchInput = input => {
		console.log("searching");
		API.getNutritionInfo(input)
			.then(res => {
				this.setState({ foodResults: res.data.common });
			})
			.catch(err => console.log(err));		
	}

	render(){
		return (
			<Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
				<Banner title="Is It Keto?" />
				<SearchBar placeholder="Search food items" search={this.searchInput}/>
			</Grid>
		);
	}
}

export default IsItKeto;

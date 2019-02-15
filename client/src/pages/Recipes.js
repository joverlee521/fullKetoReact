import React from "react";
import { Grid } from "@material-ui/core";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import "./pages.css";

function Recipes() {
  return (
    <Grid container direction="column" className="container" justify="flex-start" alignContent="flex-start">
      <Banner title="Recipes"/>
      <SearchBar placeholder="Search ingredients"/>
    </Grid>
  );
}

export default Recipes;

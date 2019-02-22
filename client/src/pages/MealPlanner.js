import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Banner from "../components/Banner";

function MealPlanner(props) {
  const { loggedIn } = props;
  console.log(loggedIn);
  return (
    <Grid container direction="column" className="container">
      <Banner title="Meal Planner"/>
      <Typography>{ loggedIn ? "Logged in!" : "Not logged in!" }</Typography>
    </Grid>
  );
}

export default MealPlanner;

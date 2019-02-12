// Dependencies.
require("dotenv").config();
var express = require("express");
var routes = require("./routes");
var db = require("./models");

// Sets up the express app.
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up data handling for express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

// Routes
app.use(routes);

// Setting up sync options for Sequelize
var syncOptions = { force: false };
// If running a test, set syncOptions.force to true
if (process.env.NODE_ENV === "test") {
    // clearing the `testdb`
    syncOptions.force = true;
}

// Syncing our models and starting app.
db.sequelize.sync(syncOptions).then(function(){
    app.listen(PORT, function(){
        console.log("Listening on PORT: " + PORT);
    });
});

module.exports = app; //for testing
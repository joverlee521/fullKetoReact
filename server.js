// Dependencies.
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const passport = require("./config/passport");
const routes = require("./routes");
const db = require("./models");

// Sets up the express app.
const app = express();
const PORT = process.env.PORT || 8080;

// ===== Middleware =====
// Sets up data handling for express app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Setting up session storage
app.use(
    session({
        secret: process.env.APP_SECRET,
        store: new SequelizeStore({ db: db.sequelize }),
        resave: false,
        saveUninitialized: false
    })
);

// ===== Passport =====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// ===== Routes =====
app.use(routes);

// Setting up sync options for Sequelize
let syncOptions = { force: false };
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
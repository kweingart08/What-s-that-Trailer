//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Basic user Schema
//Username: is the users choosen name, but must be unique
//Password: is the users choosen password
//Admin: is true if the user is an Admin, false for all other users
//favMovies: is an array of saved movie IDs used to display that individuals favorite movies from the database
const userSchema = Schema({
  username: { type: String, unique: true },
  password: String,
  admin: Boolean,
  favMovies: [String]
});

//Export the user module to the routes
module.exports = mongoose.model("User", userSchema);

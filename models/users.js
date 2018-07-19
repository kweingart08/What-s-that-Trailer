//Dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Basic user Schema
//Username: is the users choosen name, but must be unique
//Password: is the users choosen password
//Admin: is true if the user is an Admin, false for all other users
//favMovies: is an array of saved movie IDs used to display that individuals favorite movies from the database
const userSchema = Schema({
  username: { type: String, unique: true , required: true},
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  favMovies: { type: [String], default: [] }
});

//Export the user module to the routes
module.exports = mongoose.model("User", userSchema);

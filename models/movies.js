//Model for movies added by the user

const mongoose = require("mongoose");

//Title is the title of the movie.  All movies require a unique name
//Description: A short description of the movie
//Year: The year the movie was first released
//Rating: The rating the movie recieved.  Movies without a rating are abbreviated by 'NR'
//TrailerUrl: A link to the movie Url if it has one
//imbdUrl: A link to the movie's IMDb page if it has one
//image: A Url of an image for that movie

const movieSchema = mongoose.Schema({
  title: { type: String, unique: true }
  description: String,
  year: Number,
  rating: String,
  trailerUrl: String,
  imbdUrl: String,
  image: String
});

module.exports = mongoose.model("Movies", movieSchema);

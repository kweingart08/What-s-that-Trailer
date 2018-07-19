//File contains basic routes for the movies model

//Dependencies
const express = require("express");
const Movie = require("../models/movies.js");
const router = express.Router();

//GET Routes
//This route pulls everything from the database, sorts it by title, then sends it as a json object
router.get("/", (req, res) => {
  Movie.find({}).sort( {title: 1} ).exec( (err, foundMovies) => {
    res.json(foundMovies);
  });
});

//POST Routes
router.post("/", (req, res) =>{
  Movie.create( req.body, (err, createdMovie) => {
    res.json(createdMovie);
  });
});

//PUT Routes
router.put("/:id", (req, res) => {
  Movie.findByIdAndUpdate( req.params.id, req.body, { new: true }, (err, updatedMovie) => {
    res.json(updatedMovie);
  });
});

//DELETE Routes
router.delete("/:id", (req, res) => {
  Movie.findByIdAndRemove( req.params.id, (err, deletedMovie) => {
    res.json(deletedMovie);
  });
});

//Export routes to the movies controller
module.exports = router;

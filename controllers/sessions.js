//Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const Movie = require("../models/movies.js");
const router = express.Router();

//DELETE Routes
//Route deletes current session and sends a (200: "Logout Complete") message when successful
router.delete("/", (req, res) => {
  req.session.destroy( () => {
    res.status(200).json({
      status: 200,
      message: "Logout Complete"
    });
  });
});

//POST Routes
//Route finds the username and checks to see if the password is correct, if so, a session is created
router.post("/", (req, res) => {
  //Find a user based off of the username.  Usernames are unique so there can only be one result, or none
  User.findOne( { username: req.body.username }, (err, foundUser) => {
    //If the username was not found, send a (403: "Username not found") message and do nothing else
    if(foundUser === null){
      res.status(403).json({
        status: 403,
        message: "Username not found"
      });
      //If the username was found
    } else {
      //Compare the entered password with the foundUser password
      if( bcrypt.compareSync( req.body.password, foundUser.password) ){
        //If the password is correct, create a session based off of the foundUser
        //And send a (201: "Session Created") message
        req.session.currentUser = foundUser;
        res.status(201).json({
          status: 201,
          message: "Session Created"
        });
        //If the password is wrong
      } else {
        //Send a (401: "Login Failed") message
        res.status(401).json({
          status: 401,
          message: "Login Failed"
        });
      }
    }
  });
});

//PUT Routes
//Route adds the ID of a movie to the users favMovies array
router.put("/addmovie/:id", (req, res) => {
  //Find the index of the added movie
  const movieIndex = req.session.currentUser.favMovies.indexOf(req.params.id);
  //If the movie was not found, push it on to the array
  if(movieIndex === -1){
    //Push the new movie ID onto the session
    req.session.currentUser.favMovies.push(req.params.id);
  }
  //Find the user in the database and update it
  User.findByIdAndUpdate( req.session.currentUser._id, req.session.currentUser, { new: true }, (err, foundUser) => {
    //If the user isn't found
    //Send a (403: "Not logged in") message
    if(foundUser === null){
      res.status(403).json({
        status: 403,
        message: "Not logged in"
      });
      //Else the user was updated and
      //Send a (202: "Movie Added") message
    } else {
      res.status(202).json({
        status: 202,
        message: "Movie Added"
      });
    }
  });
});

//Route removes a movie from the users favMovies array
router.put("/removemovie/:id", (req, res) => {
  //Get the index of movie(:id) from the favMovies array
  const movieIndex = req.session.currentUser.favMovies.indexOf(req.params.id);
  //If the index is found
  if( movieIndex != -1){
    //Remove that movie from the array
    req.session.currentUser.favMovies.splice(movieIndex, 1);
    //If the movie is not found, send an error message
  } else {
    console.log("Movie not found");
  }

  //Find and update the user model
  User.findByIdAndUpdate( req.session.currentUser._id, req.session.currentUser, { new: true }, (err, foundUser) => {
    //If the user isn't found
    //Send a (403: "Not logged in") message
    if(foundUser === null){
      res.status(403).json({
        status: 403,
        message: "Not logged in"
      });
      //Else the user was updated and
      //Send a (207: "Movie Removed") message
    } else {
      res.status(207).json({
        status: 207,
        message: "Movie Removed"
      });
    }
  });
});

//GET Routes
router.get("/usermovies", (req, res) => {
  Movie.find( { _id: { $in: req.session.currentUser.favMovies } } ).sort( { title: 1 } ).exec( (err, foundMovies) => {
    res.json(foundMovies);
  });
});

//Export routes to the controller
module.exports = router;

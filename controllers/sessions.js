//Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
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

//Export routes to the controller
module.exports = router;

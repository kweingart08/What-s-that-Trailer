//Dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const router = express.Router();

//POST routes
//Route Creates a new user with an encrypted password
router.post("/", (req, res) => {
  //Encrypt the users password
  req.body.password = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );
  //Create a new user, send a (201: 'User Created') message if successful
  User.create( req.body, (err, createdUser) => {
    res.status(201).json({
      status: 201,
      message: "User Created"
    });
  });
});

//Export the routes to the controller
module.exports = router;

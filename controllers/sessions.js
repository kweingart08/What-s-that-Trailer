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

//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const mongoUri =  process.env.MONGODB_URI || "mongodb://localhost:27017/movie_app";
const port = process.env.PORT || 3000;

//Sessions

//Middleware
app.use(express.json());
app.use(express.static("public"));

//Controllers
const movieController = require("./controllers/movies.js");
app.use("/movies", movieController);

//Get Routes

//Listen Route
app.listen(port, ()=>{
  console.log("I'm listening on port: ", port);
});

//Mongoose Connection
mongoose.connect(mongoUri, { useNewUrlParser: true } );
mongoose.connection.once("open", () => {
  console.log(`Connected to Mongoose.  Quack!`);
});

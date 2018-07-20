const app = angular.module('MoviesApp', [])

app.controller('MainController', ['$http', function($http){
  const controller = this;
  this.user = null;


  this.h1 = "What's That Trailer"
    // this.movies = []
    // this.movie = ''

  // this.chooseOneMovie = movie =>{
  //   this.movie = movie
  //   console.log(this.movie.title);
  // }
  //create movie
  // this.createForm = {}
  this.createMovie = function(){
    $http({
      method: 'POST',
      url: '/movies',
      data: {
        title: this.title,
        description: this.description,
        year: this.year,
        rating: this.rating,
        trailerUrl: this.trailerUrl,
        imbdUrl: this.imbdUrl,
        image: this.image
      }
      // data: this.createForm
    }).then(function(response){
      console.log(response.data);
      // this.movies.push(response.data)
      // this.createForm = {}
      controller.getMovies();
    }, error =>{
      console.log(error);
    })
  }

  this.getMovies = function(){
    $http({
      method: 'GET',
      url: '/movies'
    }).then(function(response){
      controller.movies = response.data
    }, function(){
      console.log(error);
    })
  }

  //delete movie
  this.deleteMovie = function(movie){
    $http({
      method: 'DELETE',
      url: '/movies/' + movie._id
    }).then(function(response){
      // const removeByIndex = this.movies.findIndex(movie =>
      // movie._id ===id)
      // this.movies.splice(removeByIndex, 1)
      controller.getMovies();
    },function(){
      console.log(error);
    })
  }
  //update route
  // this.updateWatched = movie => {
  //   movie.watched = !movie.watched
  //   $http({
  //     method: 'PUT',
  //     url:'/movies/' + movie._id,
  //     data:{watched: movie.watched}
  //   }).then(response =>{
  //     console.log(response.data.watched);
  //   },error =>{
  //     console.log(error);
  //   })
  // }

  // this.updateLikes = movie =>{
  //   movie.likes++
  //   $http({
  //     method: 'PUT',
  //     url: '/movies/' + movie._id,
  //     data: {likes: movie.likes}
  //   }).then(response =>{
  //     console.log(response.data.likes)
  //   }, error =>{
  //     console.log(error.message);
  //   })
  // }

  this.editMovie = function(movie){
    this.indexOfEditFormToShow = -1;
    $http({
      method: "PUT",
      url: "/movies/" + movie._id,
      data: {
        title: this.updateTitle,
        description: this.updateDescription,
        year: this.updateYear,
        rating: this.updateRating,
        trailerUrl: this.updateTrailerUrl,
        imbdUrl: this.updateImbdUrl,
        image: this.updateImage
      }
    }).then(function(response){
        controller.getMovies();
      // this.movies.push(response.data);
      // this.createForm = {};
      // controller.getMovies();
    });
  }; // end of edit Movie function

  this.getMovies()


  // user Routes
  this.createUser = function(){
    $http({
      method: "POST",
      url: "/users",
      data: {
        username: this.regUsername,
        password: this.regPassword,
        admin: false
      }
    }).then(function(response){
      console.log(response);
    }, function(){
      console.log("error");
    });
  }; //end of create user

  this.logIn = function(){
    $http({
      method: "POST",
      url: "/sessions",
      data: {
        username: this.logUsername,
        password: this.logPassword
      }
    }).then(function(response){
      console.log(response);
    }, function(){
      console.log("error");
    });
  }; // end of log in

  //Function pulls the user information from the backend framework to store in the frontend framework
  this.goApp = function(){
    $http({
      method: "GET",
      url: "/log"
    }).then(function(response){
      //Save username to test to see if register and login are working
      controller.loggedInUsername = response.data.username

      //Save the whole user into the controller
      // controller.user = response.data;
      // console.log(response.data);

    },function(){
      console.log("error");
    });
  };

  this.addMovie = (movie) => {
    console.log(`Movie that was clicked: ${movie.title}`);
  }


  //closes controller
}])

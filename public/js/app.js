const app = angular.module('MoviesApp', [])

app.controller('MainController', ['$http', function($http){
  const controller = this;
  const mykey = SECRET_KEY;

  this.baseURL = 'http://www.omdbapi.com/?'
  this.apikey = 'apikey=' + mykey
  this.query = 's='
  this.keyQuery = "i=";

  this.omdbTitle = ''
  this.searchOMDB = this.baseURL + this.apikey + '&' + this.query + this.omdbTitle;
  this.netPullOMDB = this.baseURL + this.apikey + '&' + this.keyQuery;
  this.movies = []
  this.savedMovies = [];

  this.user = null;
  this.userLoggedIn = false;
  this.movie = null;


  this.includePath = 'partials/home.html'
  this.changeInclude = (path, movie) => {
    this.includePath = 'partials/' + path + '.html';
  };

  this.changeMovie = (movie) => {
    this.movie = movie;
    this.includePath = 'partials/edit.html'
    console.log(movie);
  }

  this.h1 = "What's That Trailer"

  //OMDB search
  this.getOMDB = () => {
    $http({
      method: 'GET',
      url: this.searchOMDB + this.omdbTitle
    }).then(response => {
      this.movies = response.data.Search
      console.log(response.data);

      // controller.Title = "";
      // controller.Plot = "";
      // controller.Year = "";
      // controller.Rated = "";
      //
      // controller.Poster = "";
      //
      // controller.getMovies();
      // controller.changeInclude('home');

    }),error =>{
      console.log(error);
    }
  }

  this.createMovie = function(){
    $http({
      method: 'POST',
      url: '/movies',
      data:
      {
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
      controller.title = "";
      controller.description = "";
      controller.year = "";
      controller.rating = "";
      controller.trailerUrl = "";
      controller.imbdUrl = "";
      controller.image = "";

      controller.getMovies();
      controller.changeInclude('home');
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
      controller.getMovies();
    },function(){
      console.log(error);
    })
  }

  this.editMovie = function(movie){
    this.includePath = 'partials/home.html'
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
        controller.updateTitle = "";
        controller.updateDescription = "";
        controller.updateYear = "";
        controller.updateRating = "";
        controller.updateTrailerUrl = "";
        controller.updateImbdUrl = "";
        controller.updateImag = "";

    }, (err) => {
      console.log("Error updaing movie");
    });
  }; // end of edit Movie function

  this.getMovies();

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
      controller.userLoggedIn = true;
      controller.getUser();
      controller.changeInclude('home');

      controller.regUsername = "";
      controller.regPassword = "";
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
      controller.userLoggedIn = true;
      controller.getUser();
      controller.changeInclude('home');

      controller.logUsername = "";
      controller.logPassword = "";
    }, function(){
      console.log("error");
    });
  }; // end of log in

  this.logOut = () => {
    $http({
      method: "DELETE",
      url: "/sessions"
    }).then( (res) => {
      console.log(res);
      controller.userLoggedIn = false;
      controller.changeInclude('home');
    }, (err) => {
      console.log("Failed to log user out");
    })

  }

  //Function pulls the user information from the backend framework to store in the frontend framework
  this.getUser = () => {
    $http({
      method: "GET",
      url: "/log"
    }).then( (response) => {
      //Save the user onto the controller
      controller.user = response.data;
      // console.log(response.data);

      this.getUserMovies();
    }, (err) => {
      console.log("Error Getting User");
    });
  };

  this.getNetOMDB = (movie_id) => {
    $http({
      method: 'GET',
      url: this.netPullOMDB + movie_id
    }).then(response => {
      // this.movies = response.data.Search
      // console.log(response.data);
      const new_movie =
      {
        _id: movie_id,
        title: response.data.Title,
        description: response.data.Plot,
        year: response.data.Year,
        rating: response.data.Rated,
        // trailerUrl: movie url,
        // imbdURL: imdb url,
        image: response.data.Poster
      }

      controller.savedMovies.push(new_movie);

      console.log(new_movie);

    }),error =>{
      console.log(error);
    }
  }

  //Function pulls the subset of movies from the user's database
  this.getUserMovies = () => {
    $http({
      method: "GET",
      url: "/sessions/usermovies"
    }).then( (res) => {
      controller.savedMovies = res.data;
      for(let id of controller.user.netMovies){
        controller.getNetOMDB(id);
      }
    }, (err) => {
      console.log("Failed to load user movies");
    })
  }

  //Function adds a movie to the users favorite movie array
  this.addMovie = (movie) => {
    $http({
      method: "PUT",
      url: "/sessions/addmovie/" + movie._id
    }).then( (res) => {
      console.log(res);
      controller.getUser();
    }, (err) => {
      console.log("Failed to save movie");
    });
  }

  //Function removes a movie from the users favorite movie array
  this.removeUserMovie = (movie) => {
    $http({
      method: "PUT",
      url: "/sessions/removemovie/" + movie._id
    }).then( (res) => {
      // console.log(res);
      this.getUserMovies();
    }, (err) => {
      console.log("Failed to remove movie");
    });
  }

  //Function checks to see if the movie being removed is an user added movie or a net added movie and calls the apropriate function to remove it
  this.removeMovie = (movie) => {
    //If the first two characters of the movie ID are t, then it's a net movie
    if(movie._id.charAt(0) === "t" && movie._id.charAt(1) === "t"){
      controller.removeNetMovie(movie);
      //Else it is a user movie
    } else {
      controller.removeUserMovie(movie);
    }
  }


  //Function adds a movie to the users netMovie array
  this.addNetMovie = (movie) => {
    $http({
      method: "PUT",
      url: "/sessions/addnetmovie/" + movie._id
    }).then( (res) => {
      // console.log(res);
      controller.getUser();
    }, (err) => {
      console.log("Failed to save net movie");
    });
  }

  //Function removes a movie from the users netMovie array
  this.removeNetMovie = (movie) => {
    $http({
      method: "PUT",
      url: "/sessions/removenetmovie/" + movie._id
    }).then( (res) => {
      // console.log(res);
      // controller.savedMovies = [];
      controller.getUser();
    }, (err) => {
      console.log("Failed to remove net movie");
    });
  }

  //Used for testing purposes
  this.addTestMovie = (movie_id) => {
    const my_movie = { _id: movie_id };
    controller.addNetMovie(my_movie);
  }

  //closes controller
}])

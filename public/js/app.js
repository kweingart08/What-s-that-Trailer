const app = angular.module('MoviesApp', [])

app.controller('MainController', ['$http', function($http){
  const controller = this;

  this.h1 = 'Movie Bucket-List'
    this.movies = []
    this.movie = ''

    this.chooseOneMovie = movie =>{
      this.movie = movie
      console.log(this.movie.title);
    }
    //create movie
    this.createForm = {}
    this.createMovie = () => {

      $http({
        method: 'POST',
        url: '/movies',
        data: this.createForm
      }).then(response =>{
        // console.log(response.data);
        this.movies.push(response.data)
        this.createForm = {}
      }, error =>{
        console.log(error);
      })
    }

    this.getMovies = () => {
      $http({
        method: 'GET',
        url: '/movies'
      }).then(response =>{
        this.movies = response.data
      }, error => {
        console.log(error);
      })
    }

    //delete movie
    this.deleteMovie = (id) =>{
      $http({
        method: 'DELETE',
        url: '/movies/' + id
      }).then(response => {
        const removeByIndex = this.movies.findIndex(movie =>
        movie._id ===id)
        this.movies.splice(removeByIndex, 1)
      },error => {
        console.log(error);
      })
    }
    //update route
    this.updateWatched = movie => {
      movie.watched = !movie.watched
      $http({
        method: 'PUT',
        url:'/movies/' + movie._id,
        data:{watched: movie.watched}
      }).then(response =>{
        console.log(response.data.watched);
      },error =>{
        console.log(error);
      })
    }

    this.updateLikes = movie =>{

    movie.likes++
    $http({
      method: 'PUT',
      url: '/movies/' + movie._id,
      data: {likes: movie.likes}
    }).then(response =>{
      console.log(response.data.likes)
    }, error =>{
      console.log(error.message);
    })
  }

    this.getMovies()


    // user Routes
    this.createUser = function(){
      $http({
        method: "POST",
        url: "/users",
        data: {
          username: this.username,
          password: this.password
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
          username: this.username,
          password: this.password
        }
      }).then(function(response){
        console.log(response);
      }, function(){
        console.log("error");
      });
    }; // end of log in

    this.goApp = function(){
      $http({
        method: "GET",
        url: "/log"
      }).then(function(response){
        controller.loggedInUsername = response.data.username
      },function(){
        console.log("error");
      });
    };


  //closes controller
}])

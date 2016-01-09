// $(document).foundation();

angular.module('movieCtrl', [])
  .controller('movieCtrl', function($http, $location){
  console.log("movieCtrl instantiated")
      var self = this
      self.posters = []
      self.titles = []
      self.url = []
      self.movies = []
      self.release_year = {}
      self.directors = []
      self.overview = {}
      self.cast = []
      self.writers = []
      self.rating = {}
      self.itunes = {}
      self.amazon = {}
      self.facebook = {}
      self.movie = {}

      //show page


      $http({
          method: 'GET',
          url: 'http://api-public.guidebox.com/v1.43/all/rKsjr4MNd2bNG2EcYfsk2AgRo23BwZYT/movies/all/0/250/all/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          for (var i = 0; i < response.data.results.length; i++) {
              var object = {}
              object.poster = response.data.results[i].poster_120x171;
              object.title = response.data.results[i].title;
              object.url = response.data.results[i].metacritic;
              object.id = response.data.results[i].id;
              self.movies.push(object);
              console.log(self.movies)
              console.log(response.data.results[i].rating);
              console.log(response.data.results[i].poster_120x171);
          }

      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

      self.showMovie = function (movie_id) {
        console.log(movie_id)
        console.log($location)
        $location.path("/movie/" + movie_id);
      }

})
.controller('oneMovieCtrl', function($http, $location, $routeParams){
  var self = this;
  console.log($routeParams)

  var movie_id = $routeParams.id;
  self.movie = {};

  $http({
      method: 'GET',
      url: 'https://api-public.guidebox.com/v1.43/US/rKsjr4MNd2bNG2EcYfsk2AgRo23BwZYT/movie/' + movie_id
  }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(response);
      var movieObject = {}
      //Movie information
      movieObject.poster = response.data.poster_240x342;
      movieObject.rating = response.data.rating;
      movieObject.release_year = response.data.release_year;
      movieObject.overview = response.data.overview;
      movieObject.cast = response.data.cast[0].name;
      movieObject.directors = response.data.directors[0].name;
      movieObject.writers = response.data.writers[0].name;
      //Links to purchase
      movieObject.firstLink = response.data.purchase_web_sources[0].link;
      movieObject.firstLinkName = response.data.purchase_web_sources[0].display_name;
      movieObject.secondLink = response.data.purchase_web_sources[1].link;
      movieObject.secondLinkName = response.data.purchase_web_sources[1].display_name;
      movieObject.thirdLink = response.data.purchase_web_sources[2].link;
      movieObject.thirdLinkName = response.data.purchase_web_sources[2].display_name;
      movieObject.fourthLink = response.data.purchase_web_sources[3].link;
      movieObject.fourthLinkName = response.data.purchase_web_sources[3].display_name;
      movieObject.fifthLink = response.data.purchase_web_sources[4].link;
      movieObject.fifthLinkName = response.data.purchase_web_sources[4].display_name;

      movieObject.facebook = response.data.social.facebook.link;
      for (var i = 0; i < response.data.length; i++) {
          console.log(self.movies)
          console.log(response.data.rating);
          console.log(response.data.writers[0].name);
          console.log(response.data.directors[0].name);
          console.log(response.data.poster_240x342);
          // console.log(response.data.overview);
          console.log(response.data.release_year);
          console.log(response.data.purchase_web_sources[i].display_name);
          console.log(response.data.purchase_web_sources[i].display_name);
      }
      console.log(response.data.release_year);
      self.movie = (movieObject);
      // $location = "/#/movie"

  }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
})

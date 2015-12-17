// $(document).foundation();

angular.module('movieCtrl', [])
  .controller('movieCtrl', function($http){
  console.log("movieCtrl instantiated")
      var self = this
      self.posters = []
      self.titles = []
      self.url = []
      self.movies = []

      $http({
          method: 'GET',
          url: 'http://api-public.guidebox.com/v1.43/all/rKsjr4MNd2bNG2EcYfsk2AgRo23BwZYT/movies/all/0/6/all/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          for (var i = 0; i < response.data.results.length; i++) {
              var object = {}
              object.poster = response.data.results[i].poster_120x171;
              object.title = response.data.results[i].title;
              object.url = response.data.results[i].metacritic;
              self.movies.push(object);
              console.log(self.movies)
              console.log(response.data.results[i].rating);
              console.log(response.data.results[i].poster_120x171);
          }

      }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
      });

})
.controller('movieDetailsCtrl', function($http){
  console.log("movieDetailsCtrl instantiated")
    var self = this
    self.posters = []
    self.release_year = []
    self.writers = []
    self.rating = []
    self.link = []
    self.titles = []
    self.url = []
    self.directors = []
    self.overview = []
    self.cast = []
    self.movies = []

    $http({
        method: 'GET',
        url: 'https://api-public.guidebox.com/v1.43/US/rKsjr4MNd2bNG2EcYfsk2AgRo23BwZYT/movie/50362'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        // for (var i = 0; i < response.data.length; i++) {
            var object = {}
            object.poster = response.data.poster_240x342;
            object.directors = response.data.directors[0].name;
            object.writers = response.data.writers[0].name;
            object.cast = response.data.cast[0].name;

            object.rating = response.data.rating;
            object.release_year = response.data.release_year;
        //     object.overview = response.data.overview;
        //     object.title = response.data.title;
        //     object.url = response.data.metacritic;
            object.overview = response.data.overview;
            object.link = response.data.purchase_web_sources[1].link;

            console.log(self.movies)
            console.log(response.data.rating);
            console.log(response.data.writers[0].name);
            console.log(response.data.directors[0].name);
            console.log(response.data.poster_240x342);
            // console.log(response.data.overview);
            console.log(response.data.release_year);
        // // }


            console.log(response.data.purchase_web_sources[1].link);


    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

});

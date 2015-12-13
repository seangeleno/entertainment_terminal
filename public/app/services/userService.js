angular.module('userService', [])
  .factory('User', function($http){

    //creatign a new object
    var userFactory = {};

    // get a single User
    userFactory.get = function(id) {
      return $http.get('/api/users' + id);
    };

    //get all users
    userFactory.all = function(){
      return $http.get('api/users');
    };

    //this creates users
    userFactory.create = function(userData) {
      return $http.post('/api/users', userData);
    };

    //this allows us to update a User
    userFactory.update = function(id, userData){
      return $http.put('/api/users' + id, userData);
    };

    userFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };

    // return our entire userFactory object
    return usereFactory;

  })

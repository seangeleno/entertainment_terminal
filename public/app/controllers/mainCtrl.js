angular.module('mainCtrl', [])
  .controller('mainController', function($rootScope, $location, Auth){

    //
    var mainCtrl = this;

    // get info if a person is logged in

    mainCtrl.loggedIn = Auth.isLoggedIn()

    //check to see if a user is logged in on every request

    $rootScope.$on('$routeChangeStart', function(){
      mainCtrl.loggedIn = Auth.isLoggedIn();

      //get user information on page load
      Auth.getUser()
        .then(function(data){
          mainCtrl.user = data.data
        })
    })

  })

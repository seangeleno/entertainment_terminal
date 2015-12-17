angular.module('userCtrl', ['userService'])

.controller ('userController', function(User){

  var userCtrl = this;

  //set a processing variable to show loading things
  userCtrl.processing = true;

  //grab all the users at page load
  User.all()
    .success(function(data){

      //when all the users come back, remove the processing variable
      userCtrl.processing = false;

      //bind the users that come back to userCtrl.users
      userCtrl.users = data;
    });

  //function to delete a user
  userCtrl.deleteUser = function(id){
    userCtrl.processing = true;

    User.delete(id)
      .success(function(data){

        //get all users to update the table
        //you can also set up your own API
        //to return the list of users with the delete call
        User.all()
          .success(function(data){
            userCtrl.processing = false;
            userCtrl.users = data;
          });

      });
  }
})

//controller applied to the user creation page
.controller('userCreateController', function(User){

  var userCtrl = this;

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  userCtrl.type = 'create';

  //function to create a user
  userCtrl.saveUser = function(){
    userCtrl.processing = true;
    userCtrl.message = '';

  //use the create function in the userService
  User.create(userCtrl.userData)
    .success(function(data){
      userCtrl.processing = false;
      userCtrl.userData = {};
      userCtrl.message = data.message;
    });
  };
})

//controller applied to the user edit page
.controller('userEditController', function($routeParams, User){

  var userCtrl = this;

  //variable to hide/show elements of the view
  //differentiates between create or edit pages
  userCtrl.type = 'edit';

  //get user data for the user you want to edit
  //$routeParams is the way we grab data from the URL
  User.get($routeParams.user_id)
    .success(function(data){
      userCtrl.userData = data;
    });

  //function to save the user
  userCtrl.saveUser = function(){
    userCtrl.processing = true;
    userCtrl.message = '';

  //call the userService function to update
  User.update($routeParams.user_id, userCtrl.userData)
    .success(function(data){
      userCtrl.processing = false;

      //clear the form
      userCtrl.userData = {};

      //bind the message from our API to userCtrl.message
      userCtrl.message = data.message;
    });
  }
});

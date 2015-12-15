angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider //route provider creates the routes,

		// route for the home page
		.when('/', { //.when waits to hit a specific URL
			templateUrl : 'app/views/pages/home.html'
		})

		// login page
		.when('/login', {
			templateUrl : 'app/views/pages/login.html',
   			controller  : 'mainController',
    			controllerAs: 'login' //this is used in place of main controller
		})

		// show all users
		.when('/users', {
			templateUrl: 'app/views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
})

		// form to create a new user
		// same view as edit page


		// page to edit a user


	$locationProvider.html5Mode(true);

});

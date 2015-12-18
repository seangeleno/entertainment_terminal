angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider //route provider creates the routes,

		// route for the home page
		.when('/', { //.when waits to hit a specific URL
			templateUrl : 'app/views/html/landing_page.html'
		})

		// login page
		.when('/login', {
			templateUrl : 'app/views/html/sign_in.html',
   			controller  : 'mainController',
    			controllerAs: 'login' //this is used in place of main controller
		})
		.when('/signup', {
			templateUrl : 'app/views/html/sign_up.html',
   			controller  : 'mainController',
    			controllerAs: 'signup' //this is used for signup
		})
		.when('/movie/:id', {
			templateUrl : 'app/views/html/movie.html',
   			controller  : 'oneMovieCtrl',
    			controllerAs: 'oneMovieCtrl' //this is u
		})
		.when('/main', {
			templateUrl : 'app/views/html/main.html',
   			controller  : 'movieCtrl',
    		controllerAs: 'theMovieCtrl' //this is
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



});

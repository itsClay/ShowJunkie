
var app = angular.module('angular-starter', [
	'ui.router',
	'firebase'
]);

app.constant('FIREBASE_URL', 'https://showjunkie.firebaseio.com');

// Now the $firebaseObject, $firebaseArray, and $firebaseAuth services 
// are available to be injected into any controller, service, or factory.

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/login");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "templates/main.html",
	      controller: 'MainCtrl'
	    })
	    .state('login', {
	    	url: '/login',
	    	templateUrl: 'templates/login.html',
	    	controller: 'LoginCtrl'
	    })
	    .state('register', {
	    	url: '/register',
	    	templateUrl: 'templates/register.html',
	    	controller: 'LoginCtrl'
	    })
	    .state('resetPassword', {
	    	url: '/resetPassword',
	    	templateUrl: 'templates/resetPassword.html',
	    	controller: 'LoginCtrl'
	    })
});
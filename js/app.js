
var app = angular.module('angular-starter', [
	'ui.router',
	'firebase'
]);

// Now the $firebaseObject, $firebaseArray, and $firebaseAuth services 
// are available to be injected into any controller, service, or factory.

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "templates/main.html",
	      controller: 'MainCtrl'
	    })
});
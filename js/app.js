
var app = angular.module('angular-starter', [
	'ui.router',
	'firebase'
]);

app.run(function($rootScope, $state, Auth) {
	$rootScope.currentUser = Auth.authRef;

	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
	  // catch the error thrown by the $requireAuth promise (a $stateChangeError)
	  if (error === "AUTH_REQUIRED") {
	  	$state.go("login");
	  }
	});
});

app.constant('FIREBASE_URL', 'https://showjunkie.firebaseio.com/');

// Now the $firebaseObject, $firebaseArray, and $firebaseAuth services 
// are available to be injected into any controller, service, or factory.

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/login");

	$stateProvider
	    .state('home', {
			url: "/",
			templateUrl: "templates/main.html",
			controller: 'MainCtrl',
			resolve: {
				// controller will not be loaded until $requireAuth resolves
				// Auth refers to our $firebaseAuth wrapper in the example above
				"currentAuth": function(Auth) {
					return Auth.authRef.$requireAuth();
				}
			}
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
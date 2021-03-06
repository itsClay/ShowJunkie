// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('ShowJunkie', [
  'ionic', 
  'ionic.service.core', 
  'ionic.service.push',
  'firebase',
  'ngCordova'
]);

// Firebase forge URL
app.constant('FIREBASE_URL', 'https://showjunkie.firebaseio.com/');

app.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // Your App ID
    app_id: 'ea8f9c0e',
    // The public API key services will use for this app
    api_key: '17f760d27c49bf8605ba90bc51dd92bcf4822f1b3e2f71e1',
    // Your GCM sender ID/project number (Uncomment if supporting Android)
    gcm_id: '866122995486'
  });

}])

.run(function($ionicPlatform, $rootScope, $ionicPush, $cordovaPush, $rootScope, $state, Auth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();


    }
  });

  // set event count
  $rootScope.myEvents = [];
  $rootScope.count = 0;

  // protect routes, redirect to login page
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // catch the error thrown by the $requireAuth promise (a $stateChangeError)
    if (error === "AUTH_REQUIRED") {
      $state.go("login");
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/main.html",
      controller: 'MainCtrl',
      resolve: {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": function(Auth, $rootScope) {
          $rootScope.getCurrentUser = Auth.getCurrentUser;

          return Auth.authRef.$requireAuth();
        }
      }
    })
    .state('notified', {
      url: "/notified",
      templateUrl: "templates/notified.html",
      controller: 'notifiedCtrl'
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
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
    .state('web_view', {
      url: '/web_view',
      templateUrl: 'templates/web_view.html',
      controller: 'MainCtrl'
    })
    .state('web_notified', {
      url: '/web_notified',
      templateUrl: 'templates/web_notified.html',
      controller: 'notifiedCtrl'
    })
    .state('web_settings', {
      url: '/web_settings',
      templateUrl: 'templates/web_settings.html'
    })

  // if none of the above states are matched
  $urlRouterProvider.otherwise("/login");

});



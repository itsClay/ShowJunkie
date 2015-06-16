
app.controller('LoginCtrl', function($scope, Auth, $state, User){
	$scope.user = {};

	if(Auth.currentUser !== null){
		// user is already logged in
		$state.go('home');
	}

	$scope.login = function(){
		Auth.loginUserIn($scope.user)
			.then(function(){
				// successful login
				$state.go('home');
			}, function(error){
				$scope.error = error.toString();
			});
	};

	$scope.register = function(){

		// register login credentials
		Auth.registerNewUser($scope.user).then(function(simpleLogin){
			var newUser = angular.copy($scope.user);

			// delete password for storage in users
			delete newUser.password;

			// store uid to match to authentication
			newUser = angular.extend(newUser, simpleLogin);

			// add user object to users
			User.add(newUser).then(function(ref){
				var id = ref.key();
				var currentUser = User.get(id);

				Auth.loginUserIn({email: $scope.user.email, password: $scope.user.password })
					.then(function(){
						// success creating user and logging in
						$state.go('home');
					})
					.catch(function(err){
						console.error('Error logging in: ' + err);
					});

			}).catch(function(err){
				console.error('Error logging in: ' + err);
			});
			
		});
		
	};

	$scope.registerWithFacebook = function(){
		Auth.registerWithFacebook();
	};

	$scope.logout = function(){
		Auth.logout();
		$state.go('login');
	};


	$scope.resetPassword = function(){
		// TODO
		// https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-users-and-authentication-resetpasswordcredentials
		// $scope.authObj.$resetPassword({
		//   email: "my@email.com"
		// }).then(function() {
		//   console.log("Password reset email sent successfully!");
		// }).catch(function(error) {
		//   console.error("Error: ", error);
		// });
		
	};

});



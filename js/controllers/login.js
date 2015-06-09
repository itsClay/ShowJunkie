
app.controller('LoginCtrl', function($scope, Auth, $state){

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

		Auth.registerNewUser($scope.user)
	};


	$scope.resetPassword = function(){
		// TODO
	}

});



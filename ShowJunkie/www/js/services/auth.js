
app.factory('Auth', function(FIREBASE_URL, $firebaseAuth, $rootScope, $cordovaOauth, FACEBOOK_ID, User){
	var ref = new Firebase(FIREBASE_URL);

	// authentication object returned by $firebaseAuth contains several 
	// methods for authenticating users, responding to changes in 
	// authentication state, and managing user accounts for email/password users
	var auth = $firebaseAuth(ref);

	return {
		// used in protecting routes
		getCurrentUser: function(){
			this.currentUser = auth.$getAuth();
			return auth.$getAuth();
		},
		authRef: auth,
		currentUser: null,
		loginUserIn: function(user){

			return auth.$authWithPassword({ email: user.email, password: user.password });
		},

		registerNewUser: function(user){
			// This function returns a promise that is resolved with an object containing user data about the created user. 
			// Currently, the object only contains the created user’s uid
			return auth.$createUser({ email: user.email, password: user.password })
				.then(function(res){
					return res;
				})
				.catch(function(err){
					return err;
				})
		},
		logout: function(){
			return auth.$unauth();
		},
		registerWithFacebook: function(){
			$cordovaOauth.facebook(FACEBOOK_ID, ['email'])
			.then(function(result){

				auth.$authWithOAuthToken("facebook", result.access_token)
					.then(function(authData) {
		                var user_data = JSON.stringify(authData);
		                alert(user_data);

		                // add to users table
		                User.add(user_data);

		                $state.go('home');

		            }, function(error) {
		            	alert(JSON.stringify(error));
		            });
			}, function(error) {
				alert(JSON.stringify(error));
        	});
		}
	};

});

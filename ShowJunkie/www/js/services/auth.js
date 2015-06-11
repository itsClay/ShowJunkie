
app.factory('Auth', function(FIREBASE_URL, $firebaseAuth){
	var ref = new Firebase(FIREBASE_URL);
	
	// authentication object returned by $firebaseAuth contains several 
	// methods for authenticating users, responding to changes in 
	// authentication state, and managing user accounts for email/password users
	var auth = $firebaseAuth(ref);

	return {
		authRef: auth,
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
					console.log(err);
					return err;
				})
		},
		logout: function(){
			return auth.$unauth();
		}
	};

});
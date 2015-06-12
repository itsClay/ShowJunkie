
app.factory('User', function(FIREBASE_URL, $firebaseArray, Auth){
	var ref = new Firebase(FIREBASE_URL + 'users');

	var users = $firebaseArray(ref);

	return {
		add: function(user){

			return users.$add(user).then(function(res){
				return res;
			});
		},
		get: function(id){
			return users.$getRecord(id);
		},
		getCurrentUserSnapshot: function(){
			// get current user snapshot
			var email = Auth.getCurrentUser().password.email;
			return ref.orderByChild('email').equalTo(email);
		}
	};
});
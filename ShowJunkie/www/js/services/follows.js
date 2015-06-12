
app.factory('Follows', function(FIREBASE_URL, $firebaseArray, Auth){
	var artistRef = new Firebase(FIREBASE_URL + 'artists');
	var usersRef = new Firebase(FIREBASE_URL + 'users');

	// make firebase arrays
	var artists = $firebaseArray(artistRef);
	
	var users = $firebaseArray(usersRef);

	return {
		addArtist: function(artistId){
			var followsRef = new Firebase(FIREBASE_URL + 'follows/' + artistId);
			var artistFollows = $firebaseArray(followsRef);

			follows.$add({
				artistId: artistId,
				followers: []
			});
		},
		addFollowerToArtist: function(artistId, userId){
			artists.$keyAt(artistId)
		}
	};
});


// return User.getCurrentUserSnapshot()
//   .on("value", function(snapshot){
//     // gets current user
//     var userObj = snapshot.val();

//     for(var userId in userObj){
    
//       // refernece current user's data in firebase
//       var thisUserRef = new Firebase(FIREBASE_URL + 'users/' + userId);
//       var user = $firebaseObject(thisUserRef);

//       // create new following list
//       var following = angular.copy(userObj[userId].following);
//       following.push(artistName);
//       user.following = following;

//       console.log(following);

//       // send updated following list to firebase
//       user.$save();

//     }
//   });
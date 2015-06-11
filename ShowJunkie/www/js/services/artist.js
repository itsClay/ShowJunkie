
app.factory('Artist', function(FIREBASE_URL, $firebaseArray, $http){
	var ref = new Firebase(FIREBASE_URL + 'artists');

	var artists = $firebaseArray(ref);
	console.log(artists);

	return {
		allArtists: artists,
		get: function(id){
			return artists.$getRecord(id);
		}
	};
})

app.factory('Artist', function(FIREBASE_URL, $firebaseArray, $http){
	var ref = new Firebase(FIREBASE_URL + 'artists');

	var artists = $firebaseArray(ref);

	return {
		allArtists: artists,
		getFromSpotify: function(id){
			return $http.get('https://api.spotify.com/v1/artists/' + id)
				.then(function(res){
					console.log(res);
					return res.data;
				});
		},
		addToFirebase: function(artist){
			return artists.$add(artist);
		}
	}
})
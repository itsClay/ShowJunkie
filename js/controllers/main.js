
app.controller('MainCtrl', function($scope, $http, currentAuth, Artist){
	console.log(Artist.allArtists);

	var artistIds = [];

	artistIds.forEach(function(artistId){
		Artist.getFromSpotify(artistId).then(function(res){
			var artist = {
				name: res.name,
				genres: res.genres,
				images: res.images
			};

			Artist.addToFirebase(artist);

		});
	});	

	$scope.artists = Artist.allArtists;
	console.log(Artist.allArtists)

	// $scope.eventGrab = $http.get('https://www.eventbriteapi.com/v3/events/san%20francisco')
	// 		.then(
	// 			function (response) {
	// 			$scope.eventGrab = response.data
	// 			console.log($scope.evenGrab)
	// 			}, 
	// 			function (response) {
	// 			console.log('fail!: ', response.data)
	// 			}
	// 		);
	// };

	$http.jsonp('https://www.eventbriteapi.com/v3/events/sanfrancisco').
	  success(function(data, status, headers, config) {
	    console.log('success: ', data)
	  }).
	  error(function(data, status, headers, config) {
	  	console.log('error: ', data)
	  });
});
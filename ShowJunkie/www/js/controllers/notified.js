app.controller('notifiedCtrl', function ($scope, Notified, $rootScope, FIREBASE_URL, $firebaseArray) {

	console.log($rootScope.followingArtists);

	var ref = new Firebase(FIREBASE_URL + 'events');
	var events = $firebaseArray(ref);

	var followingObj = $rootScope.followingArtists;

	$scope.myEvents = [];

	events.$loaded().then(function(allEvents){

		allEvents.forEach(function(e){
			var artists = e.artists;

			artists.forEach(function(a){

				if(typeof(followingObj[a.name]) !== 'undefined' && followingObj[a.name]){
					$scope.myEvents.push(e);
					console.log(e);
				}
			})

		});
	});

	

	// for(var artist in followingObj){
	// 	// if user is following artist get events for that artist
	// 	if(followingObj[artist]){
	// 		events
	// 	}
	// }
});
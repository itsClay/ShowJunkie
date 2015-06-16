app.controller('notifiedCtrl', function ($scope, Notified){

	$scope.myEvents = [];
	
	// get artists and whether or not user follows them
	Notified.getFollowingArtists().then(function(followList){

		// get events for artist user follows
		Notified.getEventsForArtists(followList).then(function(events_for_user){
			$scope.myEvents = events_for_user;
		});
	});

});
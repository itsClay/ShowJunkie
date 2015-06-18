app.controller('notifiedCtrl', function ($scope, Notified){
	$scope.myEvents = [];

	Notified.getFollowingArtists().then(function(followList){

		Notified.getEventsForArtists(followList).then(function(events_for_user){
			$scope.myEvents = events_for_user;
			$scope.count = $scope.myEvents.length;
		})
	});

});
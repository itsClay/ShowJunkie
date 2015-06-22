app.controller('notifiedCtrl', function ($scope, Notified, $rootScope){

	Notified.getFollowingArtists().then(function(followList){

		Notified.getEventsForArtists(followList).then(function(events_for_user){
			$rootScope.myEvents = events_for_user;
			$rootScope.count = events_for_user.length;
		})
	});
	$scope.feedLimit = 3;
	$scope.increaseFeed = function(){
		$scope.feedLimit += 10;
	};
});
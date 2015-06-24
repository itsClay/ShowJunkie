app.controller('notifiedCtrl', function ($scope, Notified, $rootScope){

	Notified.getFollowingArtists().then(function(followList){
		// 
		Notified.getEventsForArtists(followList).then(function(events_for_user){
			$rootScope.myEvents = events_for_user;
			$rootScope.count = events_for_user.length;
			console.log(events_for_user);
		})
	});
	// Show more counter
	$scope.feedLimit = 10;
	$scope.increaseFeed = function(){
		$scope.feedLimit += 10;

		if($scope.feedLimit >= $rootScope.myEvents.length){
			$scope.feedLimit = $rootScope.myEvents.length;
		}
	};
	// Accordion for longer description reading

	$scope.toggleGroup = function (group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};

	$scope.isGroupShown = function (group) {
		return $scope.shownGroup === group;
	};
});
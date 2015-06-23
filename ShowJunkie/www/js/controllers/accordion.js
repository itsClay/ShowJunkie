app.controller('accordionCtrl', function ($scope) {
	$scope.groups = [];
	

	$scope.accordianNotified = function (group) {
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
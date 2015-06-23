app.controller('accordionCtrl', function ($scope) {
	$scope.groups = ['asdfasdfasdfaklgjew;gjasdfasdfasgahdlfajkdlf;ajksld;jaig'];


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
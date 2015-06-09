
app.controller('MainCtrl', function($scope, $http, currentAuth){

	$scope.eventGrab = [ {name:'event', favoritecolor:'blue, no yellow'} ];

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

app.controller('MainCtrl', function($scope, $http, currentAuth){

	$scope.artists = [
		{ name: 'blink-182', id: '348989348439', thumbnail: '/path/to/image.jpeg' },
		{ name: 'blink-182', id: '348989348439', thumbnail: '/path/to/image.jpeg' },
		{ name: 'blink-182', id: '348989348439', thumbnail: '/path/to/image.jpeg' },
		{ name: 'blink-182', id: '348989348439', thumbnail: '/path/to/image.jpeg' },
	];
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
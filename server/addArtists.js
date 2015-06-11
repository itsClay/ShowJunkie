var request = require('request'),
	Firebase = require('firebase');

var spotifyIds = [
"4D75GcNG95ebPtNvoNVXhz",
"4AVFqumd2ogHFlRbKIjp1t",
"7Ln80lUS6He07XvHI8qqHH",
"1GAS0rb4L8VTPvizAx2O9J",
"7mnBLXK823vNxN3UWB7Gfz",
"6FBDaR13swtiWwGhX1WQsP",
"3MM8mtgFzaEJsqbjZBSsHJ",
"0du5cEVh5yTK9QJze8zA0C",
"6VDdCwrBM4qQaGxoAyxyJC",
"2CIMQHirSU0MQqyYHq0eOx",
"5Ip2ecnyGpNyZvPuuYU8Ai" ];

var FIREBASE_URL = 'https://showjunkie.firebaseio.com/';

spotifyIds.forEach(function(spotifyId){

	request({
		url: 'https://api.spotify.com/v1/artists/' + spotifyId,
		method: 'GET'
	}, function(error, response, body){
		    if(error) {
		        console.log(error);
		    } else {
		    	var response = JSON.parse(body);
		    	var ref = new Firebase(FIREBASE_URL + 'artists');
		    	var fref = new Firebase(FIREBASE_URL + 'following/' + response.name);

		    	// Add to firebase
		        ref.push({
		        	name: response.name,
		        	genres: response.genres,
		        	images: response.images
		        });

		        fref.set([
		        	'connorleech@gmail.com',
		        	'clay@gmail.com',
		        	'janna@gmail.com'
		        ]);
		    }
		});

});


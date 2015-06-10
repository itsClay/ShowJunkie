var request = require('request'),
	Firebase = require('firebase');

var ref = new Firebase('https://showjunkie.firebaseio.com/');

// get artists from firebase
var artistNames = [];
var artists = ref.child('artists');

artists.on('value', function(snapshot){
	var artistData = snapshot.val();

	// get artist names
	for(var id in artistData) {
	    var value = artistData[id];
	    artistNames.push(value.name);
	}

	// get events for artists from bands in town api
	artistNames.forEach(function(artist){
		var artistEventsEndpoint = 'http://api.bandsintown.com/artists/' + artist + '/events/search.json';

		console.log(artistEventsEndpoint);

		request({
		    url: artistEventsEndpoint,
		    qs: {
		    	app_id: 'ShowJunkie',
		    	api_version: '2.0',
		    	location: 'Oakland'
		    },
		    method: 'GET',
		}, function(error, response, body){

		    if(error) {
		        console.log(error);
		    } else {
		    	// log out json to console
		        console.log(body);
		    }
		});
	});

	// add events to firebase
});



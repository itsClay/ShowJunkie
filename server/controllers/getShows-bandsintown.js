// poll bands in town API for events for every artist in our firebase
// ==========

var request = require('request'),
	Firebase = require('firebase'),
	q = require('q'),
	randomstring = require("randomstring");

var followingRef = new Firebase('https://showjunkie.firebaseio.com/following');

followingRef.on('value', function(snapshot){
	var result = snapshot.val();
	var artists = [];

	// get artist names
	for(var artistName in result) {
	    artists.push({
	    	name: artistName,
	    	upcoming_events: []
	    });
	}
	var allArtistEventsLoaded = [];
	// add events for all artists
	artists.forEach(function(artist, i){
		var artistEventsEndpoint = 'http://api.bandsintown.com/artists/' + artist.name + '/events/search.json';
		
		// add defer to array
		var artistEventsLoaded = q.defer();
		allArtistEventsLoaded.push(artistEventsLoaded);

		// send request to bands in town
		request({
		    url: artistEventsEndpoint,
		    qs: {
		    	app_id: randomstring.generate(),	// change this to avoid "rate limit exceeded"
		    	api_version: '2.0',
		    	location: 'Oakland'
		    },
		    method: 'GET',
		}, function(error, response, body){

		    if(error) {
		        artistEventsLoaded.reject('Error: Could not get events for ' + artist.name);
		    } else {
		    	console.log(JSON.parse(body))
		    	// add events for artist
		    	artists[i].upcoming_events = JSON.parse(body);
		    	artistEventsLoaded.resolve();
		    }
		});
	});

	q.all(allArtistEventsLoaded).then(function(){
		
		console.log(artists);
		console.log('all requests finished');
	});


});




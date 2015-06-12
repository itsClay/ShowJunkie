// script to add artists to firebase based on their spotify id
// run: $ node addArtists
// =========

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
"5Ip2ecnyGpNyZvPuuYU8Ai",
"5fMUXHkw8R8eOP2RNVYEZX",
"6nS5roXSAGhTGr34W6n7Et",
"3TVXtAsR1Inumwj472S9r4",
"4AcHt3JxKy59IX7JNNlZn4",
"16eRpMNXSQ15wuJoeqguaB",
"7jy3rLJdDQY21OgRLCZ9sD",
"0XNa1vTidXlvJ2gHSsRi4A",
"3a9qv6NLHnsVxJUtKOMHvD",
"7oPftvlwr6VrsViSDV7fJY",
"4Ui2kfOqGujY81UcPrb5KE",
"0q9lPhJHW5R9J7RXIJRbTk",
"4FZ3j1oH43e7cukCALsCwf",
"5K4W6rqBFWDnAN6FQUkS6x",
"2YZyLoL8N0Wb9xBt1NhZWg",
"0fA0VVWsXO9YnASrzqfmYu",
"51xJF4OqJPHWop1fv0VVyd",
"6oBm8HB0yfrIc9IHbxs6in",
"4MSMDY0ClgWqXApU53I1L1",
"1hzfo8twXdOegF3xireCYs",
"1yAwtBaoHLEDWAnWR87hBT",
"4XaUmUGjidSklcDHxv3XWf",
"0RpddSzUHfncUWNJXKOsjy",
"21mKp7DqtSNHhCAU2ugvUw",
"7gjAu1qr5C2grXeQFFOGeh",
"1xU878Z1QtBldR7ru9owdU",
"7gkRNHOOt7QfhhXf0rEnmj",
"2RhRT6DNOVoDTfS0rG31pZ",
"0L8ExT028jH3ddEcZwqJJ5",
"6MxlVTY6PmY8Nyn16fvxtb",
"2iEvnFsWxR0Syqu2JNopAd",
"0K1q0nXQ8is36PzOKAMbNe",
"77AiFEVeAVj2ORpC85QVJs",
"3XXrhkZKSGd3CUJQFnx5tQ",
"24XtlMhEMNdi822vi0MhY1",
"06HL4z0CvFAxyc27GXpf02",
"0C0XlULifJtAgn6ZNCW2eu",
"1SQRv42e4PjEYfPhS0Tk9E",
"1GLtl8uqKmnyCWxHmw9tL4",
"4BntNFyiN3VGG4hhRRZt9d",
"3iOvXCl6edW5Um0fXEBRXy",
"3YQKmKGau1PzlVlkL1iodx",
"5oOhM2DFWab8XhSdQiITry"];

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

		        // Add to following
		        fref.push('connorleech@gmail.com');
		        fref.push('claydshaw@gmail.com');

		        // hoooray!
		        console.log('artists added!');
		    
		    }
		});

});


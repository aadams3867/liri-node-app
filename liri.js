// Load the NPM Packages
var twitter = require('twitter');
var spotify = require('spotify-web-api-node');
var request = require('request');
var fs = require('fs');

// Grab the Twitter data from keys.js and Store in keyList
var keys = require('./keys.js');
var keyList = keys.twitterKeys;

// Stores the command line arguments
var arg1 = process.argv[2];
var arg2 = process.argv[3];

whichCommand(arg1, arg2);

// Determine which command has been requested
function whichCommand(arg1, arg2) {
	switch (arg1) {
		case "my-tweets":
			tweets20();
			break;
		case "spotify-this-song":
			spots(arg2);
			break;
		case "movie-this":
			movies(arg2);
			break;
		case "do-what-it-says":
			does();
			break;
		default:
			console.log("Please use my-tweets, spotify-this-song, movie-this, or do-what-it-says.");
	}
}

// Command logic here
function tweets20() {

	var params = {count: '20'};

	var client = new twitter({
		consumer_key: keyList.consumer_key,
		consumer_secret: keyList.consumer_secret,
		access_token_key: keyList.access_token_key,
		access_token_secret: keyList.access_token_secret
	});

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  	if (!error) {
			console.log("=========================================");
			for (var i=0; i<tweets.length; i++) {
				var tweetDate = tweets[i].created_at;
				var tweetText = tweets[i].text;
				console.log("This tweet was made on: " + tweetDate);
				console.log(tweetText);
				console.log("=========================================");
			}
		} else {
			console.log("Error with tweets!");
		}
	});
}

function spots(songName) {


}

function movies(movieName) {
	// If movieName was left blank, then it defaults to the movie, "Mr. Nobody"
	if (!movieName) {
		console.log("No movie requested!  Defaulting to...");
		movieName = "Mr Nobody";
	}

	// If movieName is more than 1 word, take out the spaces and replace with "+"
	movieName = movieName.split(" ").join("+");

	// Assemble the URL to use to request movie info from OMDB
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';

	// Create a request for the queryUrl
	request(queryUrl, function (error, response, body) {
		// If the request is successful
		if (!error && response.statusCode == 200) { 

			var object = JSON.parse(body);

			console.log("");
			console.log("Title: " + object.Title);
			console.log("Released in: " + object.Year);
			console.log("IMDB Rating: " + object.imdbRating);
			console.log("Produced in: " + object.Country);
			console.log("Language: " + object.Language);
			console.log("Plot: " + object.Plot);
			console.log("Actors: " + object.Actors);
			console.log("Rotten Tomatoes Rating: " + object.tomatoRating);
			console.log("Rotten Tomatoes URL: " + object.tomatoURL);
		}
	});
}

function does() {
	fs.readFile("random.txt", "utf8", function (err, data) {
		// Break the str by comma separation, and Store in outputArray
		var outputArray = data.split(",");
		console.log("Doing another command very soon!");
		whichCommand(outputArray[0], outputArray[1]);
	});
}
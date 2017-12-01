var tweetkeys = require("./keys.js"); //load keys from external file.
var operand = process.argv[2]; // set input operator
var action = '' //give empty string
if (process.argv.length > 3) { //check for user input
    action = process.argv[3];
}
var inputArray = process.argv;
runCase(operand, action, inputArray);

function runCase(operand, action, inputArray) { //function controll on inputs
    switch (operand) {
        case 'movie-this':
            movie(inputArray);
            break;
        case 'my-tweets':
            tweet();
            break;
        case 'spotify-this-song':
            spot(action);
            break;
        case 'do-what-it-says':
            doIt();
            break;

    }
}

function movie(inputArray) {
    var request = require("request");

    var movieName = "";

    for (var i = 3; i < inputArray.length; i++) { //look into array at index 2 if exists and loop onward

        if (i > 2 && i < inputArray.length) { // form query of movie

            movieName = movieName + "+" + inputArray[i];

        }
    }

    if (inputArray.length === 3) { //use mr. nobody if they dont pass any parameters past movie-this

        movieName = 'Mr. Nobody';

    }
    movieName = movieName.replace(' ', '+'); //logic handles spaces in case the input is in quotes


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl)
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            log("Movie Title: " + JSON.parse(body).Title);
            log("Release Year: " + JSON.parse(body).Year);
            log("Imdb rating : " + JSON.parse(body).imdbRating);
            if (JSON.parse(body).Ratings[1]) {
                log("Rotten tomato rating : " + JSON.parse(body).Ratings[1].Value); //deals with the case that Rotten tomatoes doesn't have a score
            }
            log("Produced in: " + JSON.parse(body).Country);
            log("Language: " + JSON.parse(body).Language);
            log("Actors: " + JSON.parse(body).Actors);
            log("Plot: " + JSON.parse(body).Plot);
        }
    });
}

function tweet() {
    var Twitter = require('twitter'); //get twitter npm

    var client = new Twitter({ //dont care about people seeing these as the account is a spoof but import is added
        consumer_key: tweetkeys.consumer_key,
        consumer_secret: tweetkeys.consumer_secret,
        access_token_key: tweetkeys.access_token_key,
        access_token_secret: tweetkeys.access_token_secret
    });

    var params = { screen_name: 'KdurantAlias' }; //go to spoof account
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) throw error; //check for error
        for (var i = 0; i < 20; i++) { //loop through 20 most recent, log date and tweet content
            log(tweets[i].created_at + "  KdurantAlias tweeted: '" + tweets[i].text + "'");
        }
    });
}

function spot(test) {
    var Spotify = require('node-spotify-api'); //get spotify npm

    var spotify = new Spotify({ //add personal keys
        id: '8bede0e9353e44018e0c66ec554e5fa9',
        secret: '9709ad4f737c4610b90fd4f4b6fbece4'
    });
    if (test === '') { //check for empty input, if so assign ace of bass song
        test = 'the sign Ace';
    }
    spotify
        .search({ type: 'track', query: test })
        .then(function(response) { //find and log relevant data from JSON object
            log("artist list :")
            for (var i = 0; i < response.tracks.items[0].artists.length; i++) { //loop for multiple artists
                log((i + 1) + ": " + response.tracks.items[0].artists[i].name);
            }
            log('Song Name: ' + response.tracks.items[0].name);
            log('Preview url (null if not available): ' + response.tracks.items[0].preview_url);
            log('Album name: ' + response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
}
var fs = require("fs"); // get filesystem up and running

function doIt() {
    var fs = require("fs"); //shouldn't need this because of line 128 but cloud 9 was not happy without it.
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var movieOption = dataArr[1]; //give two empty indexes to match Input array logic
        movieOption = movieOption.split(' ');
        var temp = movieOption.splice(0, 0, '', '', dataArr[0]) // set up to match input type, logic skips index 0 and 1 so make them empty here.
        runCase(dataArr[0], dataArr[1], movieOption);
    });
}

function log(text) {
    fs.appendFile('log.txt', text + '\r\n', function(err) { //prettify text file with new lines, append lines.
        if (err) {
            console.log(err);
        }
    })
    console.log(text); // console log whatever used to be console logged before.
}
//log('testing'); works

//var tweetkeys = require("./keys.js");//not keys we care about
var operand = process.argv[2];
var action = ''
if (process.argv.length > 3) {
    action = process.argv[3];
}
var inputArray = process.argv;
runCase(operand, action, inputArray);
//console.log(process.argv.length);
function runCase(operand, action, inputArray) {
    //console.log(operand + ' ' + action);
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

        default:
            // code
    }
}

function movie(inputArray) {
    var request = require("request");
    //console.log(inputArray.length);

    // Store all of the arguments in an array
    //var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < inputArray.length; i++) {

        if (i > 2 && i < inputArray.length) {

            movieName = movieName + "+" + inputArray[i];

        }
    }

    if (inputArray.length === 3) { //use mr. nobody if they dont pass any parameters past movie-this

        movieName = 'Mr.+Nobody';

    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl)
    request(queryUrl, function(error, response, body) {
        // If the request is successful
        //console.log(JSON.stringify(body, null, 2)); //display body to make finding data easier.
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Imdb rating : " + JSON.parse(body).imdbRating);
            console.log("Rotten tomato rating : " + JSON.parse(body).Ratings[1].Value); //not working here
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
        }
    });
}

function tweet() {
    var Twitter = require('twitter');

    var client = new Twitter({ //dont care about people seeing these as the account is a spoof
        consumer_key: 'hEVuNfA95bdIl0p6IObSqsbwJ',
        consumer_secret: 'egkIo10KGtBM867zmEG1rDlRMagJgqZmNNqewI5Okrhg932JZW',
        access_token_key: '935586317970354178-VLPKlsl2GWlkmqX6mKi1NsGw1Re5Bn2',
        access_token_secret: 'HNA0DK9i9I4Switgq4jUIMAi222tJLhgC7fcd3NYjT1Hn'
    });

    var params = { screen_name: 'KdurantAlias' }; //go to spoof account
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) throw error; //check for error
        for (var i = 0; i < 20; i++) { //loop through 20 most recent, log date and tweet content
            console.log(tweets[i].created_at + "  KdurantAlias tweeted: '" + tweets[i].text + "'");
            console.log('------------------');
        }
    });
}

function spot(test) {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: '8bede0e9353e44018e0c66ec554e5fa9',
        secret: '9709ad4f737c4610b90fd4f4b6fbece4'
    });
    if (test === '') {
        test = 'the sign Ace';
    }
    spotify
        .search({ type: 'track', query: test })
        .then(function(response) {
            console.log("artist list :")
            for (var i = 0; i < response.tracks.items[0].artists.length; i++) { //loop for multiple artists
                console.log((i + 1) + ": " + response.tracks.items[0].artists[i].name);
            }
            console.log('Song Name: ' + response.tracks.items[0].name);
            console.log('Preview url (null if not available): ' + response.tracks.items[0].preview_url);
            console.log('Album name: ' + response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });
}

function doIt() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        //console.log(dataArr);
        runCase(dataArr[0], dataArr[1]);
    });
}

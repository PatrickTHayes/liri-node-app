var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '8bede0e9353e44018e0c66ec554e5fa9',
    secret: '9709ad4f737c4610b90fd4f4b6fbece4'
});

spotify
    .search({ type: 'track', query: 'All the Small Things' })
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

# liri-node-app
twitter, omdb, spotify talking to node application


Instructions -
to get last 20 tweets from KdurantAlias: node liri.js my-tweets
    This is a spoof account. Keys for this account are included for ease of use.
    if you wanted to make this a personal app, you just have to replace the keys in the keys.js file
            you will still have to overwrite with your own in the tweet function (line 84-87)

to get movie information: node liri.js movie-this <your> <movie> <title> <here>
    (seperated by spaces)
    no movie title will invoke a search for Mr. Nobody
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

to get spotify information: node liri.js spotify-this-song <"Your song title">
    (be sure to open and close your quote marks)
    no song title will invoke a search for 'the sign' by 'ace of base'
```
     * Artist(s) - (will make a numbered list of artists)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
```
to run whatever is in the text file: node liri.js do-what-it-says
    reads the file and runs the appropriate operation.
    Seperates text into operand and action. text is split at the first ',' seen
        As such, be wary of putting commas in outside of that use
    Operands should be one of three previous valid operands
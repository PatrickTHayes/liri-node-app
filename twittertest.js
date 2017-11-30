var tweetkeys = require("./keys.js"); //if you wanted to hide them
console.log(tweetkeys);
var Twitter = require('twitter');
console.log(tweetkeys.consumer_key);

var client = new Twitter({ //dont care about people seeing these as the account is a spoof
    consumer_key: tweetkeys.consumer_key,
    consumer_secret: tweetkeys.consumer_secret,
    access_token_key: tweetkeys.access_token_key,
    access_token_secret: tweetkeys.access_token_secret
});
console.log(client);

var params = { screen_name: 'KdurantAlias' }; //go to spoof account
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) throw error; //check for error
    for (var i = 0; i < 20; i++) { //loop through 20 most recent, log date and tweet content
        console.log(tweets[i].created_at + "  KdurantAlias tweeted: '" + tweets[i].text + "'");
        console.log('------------------');
    }
});


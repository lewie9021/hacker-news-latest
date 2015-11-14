var Express = require("express");
var Promise = require("bluebird");
var Fetch = require('node-fetch');

var app = Express();
var hackerNewsAPI = "https://hacker-news.firebaseio.com/v0/";
var port = 8080;

// In-memory cache.
// TODO: Dumpt to file in intervals (if new stories have been added).
var cache = {
    stories: {}
};

function parseJSON(response) {
    return response.json();
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    next();
});

app.get("/latest", function (req, res) {
    Fetch(hackerNewsAPI + "newstories.json")
        .then(parseJSON)
        .then(function(storyIDs) {
            // At this point we have a list of IDs mapping to the latests stories.
            var requests = storyIDs
                    // Filter out stories we already have in cache.
                    .filter(function(storyID) {
                        return !cache.stories[storyID];
                    })
                    // Return an array of request promises to fetch uncached stories.
                    .map(function(storyID) {
                        return Fetch(hackerNewsAPI + "item/" + storyID + ".json")
                            .then(parseJSON);
                    });

            console.log("new requests:", requests.length);
            
            Promise.all(requests)
                .then(function(newStories) {
                    // Cache each new story to make future requests instant.
                    newStories.forEach(function(story, index) {
                        if (!story)
                            return console.log(story, index);
                            
                        cache.stories[story.id] = story;
                    });

                    // Return the complete set of new stories (merge of cached and live stories).
                    res.json(storyIDs.map(function(storyID) {
                        return cache.stories[storyID];
                    }));
                });
        });
});

var server = app.listen(port, function() {
    console.log("HackerNews API listening on port", port);
});


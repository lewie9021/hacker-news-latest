var Express = require("express");
var Promise = require("bluebird");
var Fetch = require('node-fetch');

var app = Express();
var hackerNewsAPI = "https://hacker-news.firebaseio.com/v0/";
var port = 8080;

// In-memory cache.
// TODO: Dump to file in intervals (if new items have been added).
var cache = {
    items: {}
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
        .then(function(itemIDs) {
            // At this point we have a list of IDs mapping to the latests items.
            var requests = itemIDs
                    // Only deal with the top 50 most recent items.
                    .slice(0, 50)
                    // Filter out items we already have in cache.
                    .filter(function(itemID) {
                        return !cache.items[itemID];
                    })
                    // Return an array of request promises to fetch uncached items.
                    .map(function(itemID) {
                        return Fetch(hackerNewsAPI + "item/" + itemID + ".json")
                            .then(parseJSON);
                    });

            console.log("new requests:", requests.length);
            
            Promise.all(requests)
                .then(function(newItems) {
                    // Cache each new item to make future requests instant.
                    newItems.forEach(function(item, index) {
                        if (!item)
                            return console.log(item, index);
                        
                        cache.items[item.id] = item;
                    });
                    
                    // Return the complete set of stories (merge of cached and live stories).
                    res.json(
                        itemIDs
                            // Map item IDs to their details we have in cache.
                            .map(function(itemID) {
                                return cache.items[itemID];
                            })
                            // Filter out items that aren't stories.
                            .filter(function(item) {
                                return item && item.type == "story";
                            })
                    );
                });
        });
});

var server = app.listen(port, function() {
    console.log("HackerNews API listening on port", port);
});


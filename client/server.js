var Path = require("path");
var Express = require("express");
var Webpack = require("webpack");
var WebpackDevMiddleware = require("webpack-dev-middleware");
var WebpackHotMiddleware = require("webpack-hot-middleware");
var Config = require("./webpack.config");

var app = Express();
var port = 3000;

var compiler = Webpack(Config);

app.use(WebpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: Config.output.publicPath,
    stats: {
        colors: true
    }
}));

app.use(WebpackHotMiddleware(compiler));

app.get("/", function(req, res) {
    res.sendFile(Path.join(__dirname, "index.html"));
});

app.listen(port, function(err) {
    if (err)
        throw err;

    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
});

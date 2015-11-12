var Config = require("webpack-configurator");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (function() {
    var config = new Config();

    config.merge({
        devtool: "source-map",
        watch: true,
        entry: "./src/app.entry.js",
        output: {
            path: __dirname + "/dist",
            filename: "bundle.js"
        },
        resolve: {
            root: __dirname + "/src"
        }
    });

    config.loader("babel", {
        test: /\.jsx?/,
        exclude: /node_modules/,
        query: {
            presets: ["es2015"]
        }
    });

    config.plugin("html-webpack", HtmlWebpackPlugin, [{
        title: "HackerNews (Redux)",
        inject: "body"
    }]);

    return config.resolve();
})();

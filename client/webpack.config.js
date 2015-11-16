var Path = require("path");
var Webpack = require("webpack");
var Config = require("webpack-configurator");

module.exports = (function() {
    var config = new Config();

    config.merge({
        devtool: "source-map",
        watch: true,
        entry: [
            "webpack-hot-middleware/client",
            "./app.entry.js"
        ],
        output: {
            path: Path.join(__dirname, "dist"),
            filename: "bundle.js",
            publicPath: "/dist/"
        },
        resolve: {
            root: Path.join(__dirname, "src"),
            extensions: ["", ".js", ".jsx"]
        }
    });

    config.loader("babel", {
        test: /\.jsx?/,
        exclude: /node_modules/,
        query: {
            presets: ["es2015", "stage-2", "react"]
        }
    });

    config.plugin("webpack-hot-module-replacement", Webpack.HotModuleReplacementPlugin);

    return config.resolve();
})();

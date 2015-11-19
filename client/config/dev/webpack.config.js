var Path = require("path");
var Webpack = require("webpack");

module.exports = (function() {
    var config = require("../base/webpack.config")();

    config.merge({
        devtool: "source-map",
        watch: true,
        
        entry: [
            "webpack-hot-middleware/client",
            Path.join(__dirname, "app.entry.js")
        ]
    });

    config.plugin("webpack-hot-module-replacement", Webpack.HotModuleReplacementPlugin);

    return config.resolve();
})();

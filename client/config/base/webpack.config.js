var Path = require("path");
var WebpackConfig = require("webpack-configurator");

module.exports = function() {
    var config = new WebpackConfig();
    var rootPath = Path.join(__dirname, "..", "..");
    var outputPath = Path.join(rootPath, "dist");

    // Define general configuration.
    config.merge({
        output: {
            path: outputPath,
            filename: "bundle.js"
        },

        resolve: {
            root: Path.join(rootPath, "src"),
            extensions: ["", ".js", ".jsx"]
        }
    });

    // Enable ES6 & JSX syntax.
    config.loader("babel", {
        test: /\.jsx?/,
        exclude: /node_modules/,
        query: {
            presets: ["es2015", "stage-2", "react"],
            plugins: ["transform-runtime"]
        }
    });

    // Return the config object to be extended by a mode specific build file.
    return config;
};

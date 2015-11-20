var Path = require("path");

module.exports = (function() {
    var config = require("../base/webpack.config")();
    var rootPath = Path.join(__dirname, "..", "..");

    config.merge({
        devtool: "source-map",
        watch: true,
        
        entry: Path.join(__dirname, "app.entry.js"),

        resolve: {
            alias: {
                "specs": Path.join(rootPath, "specs")
            }
        }
    });

    return config.resolve();
})();

var Path = require("path");

module.exports = (function() {
    var config = require("../base/webpack.config")();

    config.merge({
        devtool: "source-map",
        watch: true,
        
        entry: Path.join(__dirname, "app.entry.js")
    });

    return config.resolve();
})();

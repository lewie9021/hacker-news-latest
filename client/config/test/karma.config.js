var Path = require("path");

module.exports = function(config) {
    config.set({
        // Run in Chrome.
        browsers: ["Chrome"], 

        singleRun: false,
        
        files: [
            Path.join(__dirname, "app.entry.js")
        ],

        preprocessors: {
            "app.entry.js": [
                // Process the entry file with Webpack to resolve dependencies. 
                "webpack",
                // Maintain source file references.
                // "sourcemap"
            ]
        },
        
        frameworks: [
            "mocha",
            "chai",
            "chai-sinon"
        ],
        
        reporters: [
            "mocha"
        ],
        
        webpack: require("./webpack.config"),

        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            // Allow support for Webpack with Karma.
            require("karma-webpack"),

            // Enable the Mocha testing framework and reporter.
            require("karma-mocha"),
            require("karma-mocha-reporter"),

            // Enable Chai and Sinon.
            require("karma-chai"),
            require("karma-chai-sinon"),
            
            // Make source mapping work correctly.
            // require("karma-sourcemap-loader"),
            // require("karma-source-map-support"),

            // Launcher for Chrome and Chrome Canary.
            require("karma-chrome-launcher")
        ]
    });
};

const path = require('path');

module.exports = {
    webpack: {
        alias: {},
        plugins: [],
        configure: (webpackConfig, {env, paths}) => {
            webpackConfig.resolve.fallback = {
                "crypto": require.resolve("crypto-browserify"),
                "buffer": require.resolve("buffer/"),
                "vm": require.resolve("vm-browserify"),
                "stream": require.resolve("stream-browserify"),
                // add other fallbacks here if necessary
            };

            return webpackConfig;
        },
    },
};
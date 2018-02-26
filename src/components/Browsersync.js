class Browsersync {
    constructor() {
        this.name = "browserSync";
    }

    dependencies() {
        return ["browser-sync-webpack-plugin", "browser-sync"];

        // TODO: Verify.dependency should require re-run.
    }

    register(config = {}) {
        if (typeof config === "string") {
            config = { proxy: config };
        }

        Config.browserSync = config;

        return this;
    }

    webpackPlugins() {
        if (Mix.isUsing("browserSync")) {
            let BrowserSyncPlugin = require("browser-sync-webpack-plugin");

            return new BrowserSyncPlugin(this.browserSyncConfig());
        }
    }

    browserSyncConfig() {
        return (
            Object.assign(
                {
                    host: "localhost",
                    port: 3000,
                    proxy: "app.test",
                    files: [
                        "app/**/*.php",
                        "resources/views/**/*.php",
                        "public/js/**/*.js",
                        "public/css/**/*.css"
                    ],
                    snippetOptions: {
                        rule: {
                            match: /(<\/body>|<\/pre>)/i,
                            fn: function(snippet, match) {
                                return snippet + match;
                            }
                        }
                    }
                },
                Config.browserSync
            ),
            { reload: false }
        );
    }
}

module.exports = Browsersync;

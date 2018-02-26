let Preprocessor = require("./Preprocessor");

class Stylus extends Preprocessor {
    dependencies() {
        return ["stylus-loader", "stylus"];
    }

    register(mix) {
        mix.stylus = (src, output, pluginOptions = {}) => {
            return this.preprocess("stylus", src, output, pluginOptions);
        };
    }
}

module.exports = Stylus;

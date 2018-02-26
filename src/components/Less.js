let Preprocessor = require("./Preprocessor");

class Less extends Preprocessor {
    dependencies() {
        return ["less-loader", "less"];
    }

    register(mix) {
        mix.less = (src, output, pluginOptions = {}) => {
            return this.preprocess("less", src, output, pluginOptions);
        };
    }
}

module.exports = Less;

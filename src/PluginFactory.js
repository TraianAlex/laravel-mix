let mix = require("../src/index");
let Verify = require("../src/Verify");

class PluginFactory {
    static load() {
        [
            "../src/components/stylus",
            "../src/components/less",
            "../src/components/Browsersync"
        ]
            .map(path => require(path))
            .forEach(Component => {
                let component = new Component();

                if (component.dependencies) {
                    Verify.dependency(
                        component.dependencies()[0],
                        component.dependencies()
                    );
                }

                let name =
                    component.name || component.constructor.name.toLowerCase();

                mix[name] = (...args) => {
                    component.register(...args);

                    component.activated = true;

                    return mix;
                };

                if (component.webpackPlugins) {
                    Mix.listen("loading-plugins", plugins => {
                        if (!component.activated) return;

                        let newPlugins = component.webpackPlugins();

                        if (Array.isArray(newPlugins)) {
                            plugins.push(...newPlugins);
                        } else {
                            plugins.push(newPlugins);
                        }
                    });
                }
            });
    }
}

module.exports = PluginFactory;

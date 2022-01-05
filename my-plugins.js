
const Compiler = require('./Compiler')

class MyPlugin {
    constructor() {

    }

    apply(compiler) {
        compiler.hooks.brake.tap('WarninLampPlugin', () => {
            console.log('WarningLampPlugin')
        });
        compiler.hooks.accelerate.tap('LoggerPlugin', (speed) => {
            console.log(`Accelerate to ${speed}`);
        })
        compiler.hooks.calculateRoutes.tapPromise('CalculateRoutesPlugin', (source, target, routesList) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`tapPromise from ${source} to ${target} routes ${routesList}`)
                    resolve()
                })
            })
        })
    }
}

module.exports = MyPlugin;

// const myPlugin = new MyPlugin();

// const options = {
//     plugins: [myPlugin]
// }

// let compiler = new Compiler();

// for(let plugin of options.plugins) {
//     if(typeof plugin === 'function') {
//         plugin.call(compiler, compiler)
//     } else {
//         plugin.apply(compiler);
//     }
// }

// compiler.run()
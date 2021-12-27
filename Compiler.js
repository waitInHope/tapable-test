

const { SyncHook, AsyncSeriesHook } = require('tapable');

module.exports = class Compiler {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook([]),
            calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
        }
    }

    brake() {
        this.hooks.brake.call();
    }

    accelerate(speed) {
        this.hooks.accelerate.call(speed)
    }

    calculateRoutes(source, target, routesList) {
        this.hooks.calculateRoutes.promise(source, target, routesList).then(() => {
            console.log('calculateRoutes succed')
        }, (err) => {
            console.error(err)
        })
    }

    run() {
        this.brake();
        this.accelerate(10);
        this.calculateRoutes('Async', 'hook', 'demo')
    }
}

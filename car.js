
const { SyncHook, AsyncSeriesHook } = require('tapable');

class Car {
    constructor() {
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            brake: new SyncHook([]),
            calculateRoutes: new AsyncSeriesHook(['source', 'target', 'routesList'])
        }
    }
}

let myCar = new Car();

myCar.hooks.brake.tap('WarningLampPlugin', () => {
    console.log('WarningLampPlugin')
})

myCar.hooks.accelerate.tap('LoggerPlugin', (newSpeed) => {
    console.log(`Accelerate to ${newSpeed}`)
})

myCar.hooks.calculateRoutes.tapPromise('calculateRoutes', (source, target, routesList) => {
    console.log('source', source);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`tapPromise from ${source} to ${target} routes ${routesList}`)
            resolve();
        }, 1000)
    })
})

// 开始触发钩子
myCar.hooks.brake.call();
myCar.hooks.accelerate.call(10);

console.time('cost');

myCar.hooks.calculateRoutes.promise('Async', 'hook', 'demo').then(() => {
    console.timeEnd('cost');
}, (err) => {
    console.error(err);
    console.timeEnd('cost');
})
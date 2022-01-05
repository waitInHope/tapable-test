
const Compiler = require('./Compiler.js')
const MyPlugin = require('./my-plugins.js')

// 生成配制项参数
let options = [new MyPlugin()];

// 生成compiler编译器
let compiler = new Compiler();

// 注册用户定义的插件
options.forEach((plugin) => {
    plugin.apply(compiler);
})

// 开始构建
compiler.run();
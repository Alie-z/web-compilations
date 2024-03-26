// 安装完webpack之后
const loaderUtils = require('loader-utils');
const Px2rem = require('./px2rem');

function isExclude(reg, file) {
    if (Object.prototype.toString.call(reg) !== '[object RegExp]') {
        throw new Error('options.exclude should be RegExp.');
    }
    return file.match(reg) !== null;
}

/**
 * loader的本质是一个函数，参数是上一个loader的内容或者模块的源代码
 * 经过一系列处理把处理结果返回给下一个loader或者webpack继续进行处理
 * @param {*} source
 * @returns
 */
function loader(source, sourceMap) {
    const options = loaderUtils.getOptions(this); // remUnit: 75, remPrecision: 8
    // 当前模块的路径
    const exclude = options.exclude;
    // 获取当前处理的文件路径
    const resource = this.resource;
    console.log('🚀 > loader > resource:', resource, Object.prototype.toString.call(exclude));
    if (exclude) {
        if (Object.prototype.toString.call(exclude) === '[object RegExp]') {
            if (isExclude(exclude, resource)) return source;
        } else if (Object.prototype.toString.call(exclude) === '[object Array]') {
            for (let i = 0; i < exclude.length; i++) {
                if (isExclude(exclude[i], resource)) return source;
            }
        } else {
            throw new Error('options.exclude should be RegExp or Array.');
        }
    }
    const px2rem = new Px2rem(options);
    const targetSource = px2rem.generateRem(source);
    return targetSource;
}

module.exports = loader;

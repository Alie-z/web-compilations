#### 前言

有没有面试的时候，经常被问怎么写一个`webpack`的`loader`或者`plugin`呢？这时候不知道你是不是一脸懵逼。那么这篇文章我们一起来学一下`loader`的实现，并亲手写一个阉割版的`px2rem-loader`并为官方的`px2rem-loader`拓展一些实际项目中不能满足我们使用的功能

#### loader的基本介绍

##### loader的基本使用

`loader`的本质是对源代码进行转换，预处理源代码内容。`webpack`默认只能处理`.js, .json`文件，实际项目中会有很多类型的文件，这时候就需要提供`loader`为`webpack`拓展处理其它文件的能力。 

本篇文章重在编写`loader`，不在这里介绍`loader`的基本使用，如果有不熟悉使用请点击链接[官方文档传送门](https://www.webpackjs.com/concepts/loaders/#%E4%BD%BF%E7%94%A8-loader)

##### 自定义loader的方式

编写一个`loader`[官方文档传送门](https://www.webpackjs.com/contribute/writing-a-loader/)，官方文档里边介绍了本地开发如何设置`loader`，`loader`编写准则，loader的相关工具库...

编写`loader`还需要用到[loader API](https://www.webpackjs.com/api/loaders/)，文档里边介绍了`loader`的几种写法以及[loader上下文](https://www.webpackjs.com/api/loaders/#loader-%E4%B8%8A%E4%B8%8B%E6%96%87)

编写`loader`归纳下来分为如下几种方式：

1、同步loader

```
function loader(source, sourceMap, meta){
  return targetCode;
  // 或者
  return this.callBack(null, code, sourceMap, meta);
}
```

2、异步loader

```
function loader(source, sourceMap, meta){
  const callBack = this.async();
  setTimeout(()=>{
    callBack(null, targetCode, sourceMap, meta)
  }, 2000);
}
```
3、raw loader

`webpack`默认读取资源是字符串的形式，如果需要获取`Buffer`内容，需要配置`loader`的`raw`属性`loader.raw = true;`

```
function loader(source, sourceMap, meta){
  return targetCode;
}
loader.raw = true;
module.exports = loader;
```

#### 编写自己的my-px2rem-loader

这里默认大家都熟悉`rem`适配和`px2rem-loader`以及`webpack`的使用，不熟悉的同学先去学习一下
##### 本地loader的引入方式

在项目根目录下创建`loaders`文件夹，新建`my-px2remm-loader.js`先写一个没有任何功能的`loader`
```
function loader(source){
  console.log('当前模块', this.resource) // 解析的资源的路径
  console.log(source); // 上一个loader传过来的代码
  console.log("===========");
  return source;
}
module.exports = loader;
```

先看下官方`px2rem-loader`在`webpack`中的配置，以`css`文件为例，后边会参照该配置实现自己的`my-px2rem-loader`：

```
{
  test: /\.css$/,
  use: [
    { loader:MiniCssExtractPlugin.loader },
    'css-loader',
    {
      loader: 'px2rem-loader',
      options: {
        remUnit: 75, // rem的单位
        remPrecision: 6 // 计算后的rem小数点保留精度位数
      }
    }
  ]
}
```
`options`是`px2rem-loader`的参数配置，参数在`loader`函数内部可以获取到

那么本地开发`loader`的引入方式如下：

1、直接配置本地路径
```
{
  test: /\.css$/,
  use: [
    {
      loader: path.resolve(__dirname, '../loaders/my-px2rem-loader.js'),
      options: {
        remUnit: 75,
        remPrecision: 6
      }
    }
  ]
}
```
2、resolveLoader配置

* 配置一个别名，把这个别名配置到`loader`属性
```
resolveLoader:{
  alias: {
    'my-px2rem-loader': path.resolve(__dirname, '../loaders/my-px2rem-loader.js')
  }
}
```
* 配置查找目录，文件/文件夹名需要和配置的`loader`属性值一致
```
resolveLoader:{
  modules: ['loaders', 'node_modules']
}
```
正确引入本地`my-px2rem-loader.js`文件后，执行编译查看控制台输出

![微信截图_20220721130417.png](https://upload-images.jianshu.io/upload_images/2152694-5ee254c0967eb713.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/250)

接下来就是处理传入进来的源代码，最后把经过加工处理的代码返回给下一个`loader`即可

##### 实现my-px2rem-loader

这里只实现2个功能

* `px`->`rem`
* 加 `/* no */` 注释不参与转换

新建`loaders/px2rem.js`文件，`px`转`rem`的核心功能都在这个文件。官方的`px2rem-loader`真正使用的是`px2rem`插件的功能。所以我们这里先写`px2rem`的功能。代码如下：

```
const css = require('css') // css字符串转换ast，ast在转为css代码
const pxRegExp = /\b(\d+(\.\d+)?)px\b/; // px字符串的正则匹配
class Px2rem {
  constructor(config) {
    this.options = config;
  }
  //  传入css代码转换px->rem  
  generateRem(source) {
    let self = this;
    function processRules(rules) {
      for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        const declarations = rule.declarations;
        if(declarations){
          for (let j = 0; j < declarations.length; j++) {
            const declaration = declarations[j];
            if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
              const nextDeclaration = declarations[j+1];
              // 检查下一个是不是注释，如果是注释检查是否等于no，no则不转换rem
              if(nextDeclaration && nextDeclaration.type === 'comment'){
                  if(nextDeclaration.comment.trim() === 'no') {
                    declarations.splice(j + 1, 1);
                  }else {
                    declaration.value = self._getCalcValue('rem', declaration.value)
                  }
              }else {
                declaration.value = self._getCalcValue('rem', declaration.value)
              }
            }
          }
        }
      }
    }
    // css转换为ast
    var astObj = css.parse(source)
    // 转换ast
    processRules(astObj.stylesheet.rules);
    // 生成
    const targetSource = css.stringify(astObj)
    return targetSource;
  }

  // 转换type单位的值，保留小数点位数
  _getCalcValue(type, value) {
    const { remUnit, remPrecision } = this.options;
    return value.replace(pxRegExp, (_, $1) => {
      let val = (parseFloat($1) / remUnit).toFixed(remPrecision);
      return val + type;
    })
  }
}
module.exports = Px2rem;
```
完善`loaders/my-px2rem-loader.js`代码

```
// 安装完webpack之后就有的
const loaderUtils = require('loader-utils')
const Px2rem = require('./px2rem')

function loader(source, sourceMap){
  // 获取配置的参数remUnit, remPrecision
  const options = loaderUtils.getOptions(this); 
  const px2rem = new Px2rem(options);
  // 转换px->rem
  const targetSource = px2rem.generateRem(source);
  return targetSource;
}
module.exports = loader;
```

在执行到该`loader`时（这个函数并不是纯函数，它是有状态的。存在`loader`上下文，可以通过`this`访问上下文中的属性，具体请查看[loader上下文](https://www.webpackjs.com/api/loaders/#loader-%E4%B8%8A%E4%B8%8B%E6%96%87)），通过`loader-utils`包获取配置的参数。然后通过`Px2rem`对象把`px`转换成`rem`

在`loaders/px2rem.js`中使用了一个非常重要的`css`包，该包负责`css`代码和`ast`语法树（`js`对象）相互转换

`loaders/px2rem.js`文件中核心方法` generateRem(source) `先把`css`源代码转换成`ast`，然后遍历`js`对象处理每个节点，根据传入进来的参数把需要转换的节点转成`rem`单位。最终再把转换后的`ast`通过`css`插件转换成`css`代码即可

这里只是抛砖引玉，写的比较简单，源码考虑的情况比较多比如`@media`以及`@keyframes`下的代码都进行了转换处理。有兴趣的可以学习一下[px2rem源码](https://github.com/songsiqi/px2rem/blob/master/lib/px2rem.js)。

##### 拓展px2rem-loader

以上搞定了一个阉割版的`px2rem-loader`。如果需要和官方的功能保持一致，把源代码复制出来即可。

然后我们基于此可以为自己的`my-px2rem-loader`拓展一些丰富的配置项，比如

* `exclude` 忽略某些文件夹下的文件或特定文件，例如忽略`node_modules`目录
* `include` 如果设置了`include`，那将只有匹配到的文件才会被转换
* `selectorBlackList` 忽略的`css`选择器

这里实现以下`exclude`功能，`exclude`可以传入单个正则，也可传入数组（数组中每一项必须是正则）

`loaders/my-px2rem-loader.js`修改如下：

```
const loaderUtils = require('loader-utils')
const Px2rem = require('./px2rem')

function isExclude(reg, file) {
  if (Object.prototype.toString.call(reg) !== '[object RegExp]') {
    throw new Error('options.exclude should be RegExp.');
  }
  return file.match(reg) !== null;
}

function loader(source, sourceMap){
  const options = loaderUtils.getOptions(this);
  const exclude = options.exclude;  // 当前模块的路径
  const resource = this.resource; // 获取当前处理的文件路径
  if(exclude){ // 处理忽略文件
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
```

以上代码加了对传入`exclude`属性的拦截处理，对于符合`exclude`配置的正则的资源文件不做任何处理 

那么你还能想到什么可以扩展的吗？欢迎评论区留言，谢谢！
const css = require('css'); // css字符串转换ast，ast在转为css代码
const pxRegExp = /\b(\d+(\.\d+)?)px\b/; // px字符串的正则匹配

class Px2rem {
    constructor(config) {
        this.options = config;
    }

    /**
     * 传入css代码转换px->rem
     * @param {*} source
     */
    generateRem(source) {
        let self = this;
        function processRules(rules) {
            for (let index = 0; index < rules.length; index++) {
                const rule = rules[index];
                const declarations = rule.declarations;
                if (declarations) {
                    for (let j = 0; j < declarations.length; j++) {
                        const declaration = declarations[j];
                        if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
                            const nextDeclaration = declarations[j + 1];
                            // 检查下一个是不是注释，如果是注释检查是否等于no，no则不转换rem
                            if (nextDeclaration && nextDeclaration.type === 'comment') {
                                if (nextDeclaration.comment.trim() === 'no') {
                                    declarations.splice(j + 1, 1);
                                } else {
                                    declaration.value = self._getCalcValue('rem', declaration.value);
                                }
                            } else {
                                declaration.value = self._getCalcValue('rem', declaration.value);
                            }
                        }
                    }
                }
            }
        }

        // css转换为ast
        var astObj = css.parse(source);
        // 转换ast
        processRules(astObj.stylesheet.rules);
        // 生成
        const targetSource = css.stringify(astObj);
        return targetSource;
    }

    /**
     * 转换type单位的值，保留小数点位数
     * @returns
     */
    _getCalcValue(type, value) {
        const {remUnit, remPrecision} = this.options;
        return value.replace(pxRegExp, (_, $1) => {
            let val = (parseFloat($1) / remUnit).toFixed(remPrecision);
            return val + type;
        });
    }
}

module.exports = Px2rem;

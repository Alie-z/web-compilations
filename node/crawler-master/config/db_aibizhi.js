const Sequelize = require('sequelize');
const sequelize = new Sequelize('mystore', 'root', 'mysql@666', {
    host: '122.51.3.174',
    dialect: 'mysql',
    // operatorsAliases: false,
    // dialectOptions: {
    //     // 字符集
    //     charset: "utf8mb4",
    //     collate: "utf8mb4_unicode_ci",
    //     supportBigNumbers: true,
    //     bigNumberStrings: true
    // },
    // pool: {
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },
    // timezone: '+08:00' //东八时区
});
console.log('db-aibizhi----------------------------------db')
module.exports = {
    sequelize
}

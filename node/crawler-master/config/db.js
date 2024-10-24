const Sequelize = require('sequelize');
const sequelize = new Sequelize('dsc_video_yn', 'root', 'uniqorn_20181212', {
    host: '128.1.135.44',
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
console.log('db-----------------------------------db')
module.exports = {
    sequelize
}

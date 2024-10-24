const request = require('superagent');
const download = require('download');
const fs = require('fs');
const aibizhiTypeModel = require('../crawlerStore/aibizhi');
const {promise} = require('selenium-webdriver');

let skip = 0;
const flag = 0;
const allData = [
    {id: '4e4d610cdf714d2966000000', type: '美女'},
    {id: '4e4d610cdf714d2966000003', type: '动漫'},
    {id: '4e4d610cdf714d2966000002', type: '风景'},
    {id: '4e4d610cdf714d2966000007', type: '游戏'},
    {id: '5109e04e48d5b9364ae9ac45', type: '文字'},
    {id: '4fb479f75ba1c65561000027', type: '视觉'},
    {id: '4ef0a35c0569795756000000', type: '情感'},
    {id: '4fb47a195ba1c60ca5000222', type: '设计'},
    {id: '5109e05248d5b9368bb559dc', type: '明星'},
    {id: '4fb47a465ba1c65561000028', type: '物语'},
    {id: '4e4d610cdf714d2966000006', type: '男人'},
    {id: '4e4d610cdf714d2966000005', type: '机械'},
    {id: '4fb47a305ba1c60ca5000223', type: '城市'},
    {id: '4e4d610cdf714d2966000001', type: '动物'},
    {id: '4e58c2570569791a19000000', type: '影视'}
];

async function _getAiBizhi() {
    const url = `http://service.aibizhi.adesk.com/v1/wallpaper/category/${allData[flag].id}/wallpaper?skip=${skip}`;
    console.log('====================', skip, '=============================', url);
    return new Promise(resolve => {
        request
            .get(url)
            .set('Accept', 'application/json')
            .set('User-Agent', '(picasso,170,windows)')
            .then(res => JSON.parse(res.text))
            .then(res => {
                const data = res.res.wallpaper;
                resolve(data);
            });
    });
}

async function _storeMyImg() {
    const data = await _getAiBizhi();

    if (data.length === 0) return false;
    await Promise.all(
        data.map(item => {
            download(item.img, `/Users/meijuntao/Pictures/abz`)
                .then(async () => {
                    console.log('done!');
                })
                .catch(e => {
                    console.log('下载出错了-------');
                });
        })
    );

    // for (const item of data) {
    //     downloadImg(item);
    // }
    skip += 20;
    if (skip > 5000) {
        return;
    }
    _storeMyImg();
}

async function downloadImg(item) {
    const name = item.img.match(/\/([^\/\?]+)\?/)[1];
    fs.mkdir(`../images/${item?.user?.name || '无名作者'}`, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(`${currTitle}目录创建成功`);
    });
    fs.writeFileSync(`../images/${item?.user?.name || '无名作者'}-${name}.png`, await download(item.img))
        .then(async () => {
            // console.log('done!');
        })
        .catch(e => {
            console.log('下载出错了-------');
        });
    // await download(item.img)
    //     .pipe(fs.createWriteStream(`./images/${item?.user?.name || '无名作者'}-${name}.png`))
    //     .then(async () => {
    //         console.log('done!');
    //     })
    //     .catch(e => {
    //         console.log('下载出错了-------');
    //     });
}

module.exports = {_storeMyImg};

const {driver, By, Key, until} = require('./index');
const CrawlerMuodel = require('../crawlerStore/crawler')
const download = require('download')
const bucketManager = require('../config/qiniu')
let globalData, startId
let flag = 0

async function dowVideo() {
  try {
    const currD = (await CrawlerMuodel.getcrawlerSelf(1))[0]
    await getData(currD.source * 1)
  } finally {
    // await driver.quit();
  }
}

async function getData(id) {
  startId = id
  console.log('videoNum-------------', id)
  try {
    globalData = (await CrawlerMuodel.getcrawlerSelf(id))[0]
    if (!globalData.url) {
      console.log('-----------转换完成，return------------')
      startId = false
      return false
    }
    await driver.sleep(1000)
    console.log('globalData.url', globalData.url)
    await driver.get('https://myvid.download/?url=' + globalData.url);
    let src = await driver.wait(until.elementLocated(By.css('#ressection .container .container .row a')), 15000).getAttribute('href')
    console.log('stc----------', src)
    download(src, '../../../video').then(() => {
      console.log('done!');
      getData(globalData.id + 1)
    }).catch(() => {
      console.log('????????')
      getData(globalData.id + 1)
    });
    // const key = `${globalData.time}/${globalData.video_id}.mp4`;
    // qiniu(src, key, id)
    // await CrawlerMuodel.updatecrawlerVideo({url: key, id})
    // await CrawlerMuodel.updatecrawlerNum(globalData.id + 1)
  } catch (e) {
    console.log('爬取错误！！！！！！！！！！！,重新来')
    // flag++
    // if (!startId && flag <= 3) {
    //   getData(startId)
    // } else {
    //   // await CrawlerMuodel.updatecrawlerNum(globalData.id + 1)
    //   // await CrawlerMuodel.destroycrawlerNum(startId)
    //   console.log('垃圾段子，删除了！！！！！！')
    //   getData(startId + 1)
    // }
  }
}

async function qiniu(resUrl, key, id) {

  // await Promise.all(resUrl.map(url => download('https:' + url, '../weiboImg').then(async () => {
  //   console.log('done!');
  // }).catch((e) => {
  //   console.log('下载出错了-------')
  // })));
  // console.log('------------', resUrl)
  // const bucket = 'uniqorn'
  //
  // bucketManager.fetch(resUrl, bucket, key, async function (err, respBody, respInfo) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     if (respInfo.statusCode == 200) {
  //       console.log(respBody.key);
  //       console.log(respBody.hash);
  //     } else {
  //       await CrawlerMuodel.updatecrawlerVideo({url: 'error', id})
  //       console.log(respInfo.statusCode);
  //       console.log(respBody);
  //     }
  //   }
  // });
}

module.exports = {dowVideo}

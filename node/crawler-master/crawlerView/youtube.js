const {driver, By, Key, until} = require('./index');
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
const {getParamObj} = require('../config/unitls')


let currPage = 1;
let currFlag = 0;
let globalData, source

async function youtube(id) {
  try {
    await driver.get(crawlerJson['youtube'] + id + '/videos');
    source = await driver.getTitle() + '-' + id
    await driver.sleep(2000)
    await driver.executeScript("window.scrollTo(0, document.documentElement.scrollHeight)")
    globalData = await driver.findElement(By.css('#content #page-manager #primary #contents #items'))
    await getData()
  } finally {
    // await driver.quit();
  }
}

async function renderMore() {
  await driver.executeScript("window.scrollTo(0, document.body.scrollHeight)")
  await driver.sleep(5000)
  globalData = await globalData.findElements(By.css('._1xnd'))
  globalData = globalData[globalData.length - 1]
  await getData()
}

async function getData() {
  try {
    let currData = await globalData.findElements(By.css('#dismissable'))

    // 迭代数组, 获取我们所需要的数据
    for (let i = currFlag; i < currData.length; i++) {
      try {
        console.log(`-------------当前第${currPage}页,第${i + 1}条------------`)
        let item = await currData[i]
        let video_time = await item.findElement(By.css('a #overlays .ytd-thumbnail span')).getText()
        const timeFlag = video_time.split(':')
        if (timeFlag.length > 2) continue
        if (timeFlag[0] * 1 > 10) continue
        let title = await item.findElement(By.css('#details h3')).getText()
        let videoUrl = await item.findElement(By.css('a')).getAttribute('href')
        let video_id = videoUrl.split('?v=')[1] || ''
        let imgsUrl = await item.findElement(By.css('a img')).getAttribute('src')
        const params = {
          source,
          video_id,
          title,
          url: videoUrl,
          img_url: JSON.stringify(imgsUrl),
          video_time
        }
        console.log(params)
        await CrawlerMuodel.createcrawlerVideo(params)
      } catch (e) {
        console.log('没有可用字段---------------')
        continue
      }
    }
    console.log(`${currPage}页爬取成功,共${currData.length}条数据。`)
    currFlag = currData.length - 1
    // currPage++;
    // if (currPage < 3) renderMore()
  } catch (e) {
    console.log('爬取错误！！！！！！！！！！！')
  }
}


module.exports = {youtube}

const {driver, By, Key, until} = require('./index');
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
let currPage = 1;
let maxPage = 50;
let all = 0;

async function zuiyou() {
  try {
    await driver.get(crawlerJson['zuiyou']);
    await driver.sleep(1000)
    await getData()
  } finally {
    // await driver.quit();
  }
}

async function getData() {
  while (true) {
    console.log(`----------------当前第${currPage}页-------------------`)
    let flag = true
    try {
      let items = await driver.findElements(By.css('#app .app-wrap .main .home-scroll .Post'))
      // 迭代数组, 获取我们所需要的数据
      for (let i = all; i < items.length; i++) {
        let item = items[i]
        let title = await item.findElement(By.css('.Post__container .Post-content')).getText()
        let imgs = await item.findElements(By.css('.PostBox img'))
        let imgsUrl = []
        for (let i = 0; i < imgs.length; i++) {
          let url = await imgs[i].getAttribute('src')
          imgsUrl.push(url)
        }
        imgsUrl.length === 0 ? imgsUrl = "" : imgsUrl = JSON.stringify(imgsUrl)
        let old_like = '0'
        let comments = '0'
        const params = {
          title,
          old_like,
          pinglun: comments,
          imgs: imgsUrl,
          type: imgsUrl.length > 0 ? 1 : 0,
        }
        console.log(params)
        await CrawlerMuodel.createcrawler(params)
      }
      all = items.length
      console.log(`${currPage}页爬取成功,共${all}条数据！！`)
      if (currPage <= maxPage) {
        await driver.findElement(By.css('.home-loadMore')).click()
        currPage++;
        await driver.sleep(1000)
        getData()
      }

    } catch (e) {
      flag = false
    } finally {
      if (flag) break
    }
  }

}


module.exports = {zuiyou}

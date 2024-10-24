const {driver, By, Key, until} = require('./index');
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
let currPage = 1;
let maxPage;

async function qiubai(param) {
  try {
    await driver.get(crawlerJson[param]);
    currPage = 1;
    // 在开始爬数据之前获取总页数
    maxPage = await driver.findElement(By.css('.pagination li:nth-of-type(7)>a>.page-numbers')).getText()
    await getData()
  } finally {
    // await driver.quit();
  }
}

async function getData() {
  while (true) {
    console.log(`----------------当前第${currPage}页，总共${maxPage}页-------------------`)
    let flag = true
    try {
      let items = await driver.findElements(By.css('#content-left .article'))
      // 迭代数组, 获取我们所需要的数据
      let results = []
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let title = await item.findElement(By.css('.contentHerf .content')).getText()
        let imgs = await item.findElements(By.css('.thumb a>img'))
        let imgsUrl = []
        for (let i = 0; i < imgs.length; i++) {
          let url = await imgs[i].getAttribute('src')
          imgsUrl.push(url)
        }
        imgsUrl.length === 0 ? imgsUrl = "" : imgsUrl = JSON.stringify(imgsUrl)
        let old_like = await item.findElement(By.css('.stats .stats-vote i')).getText()
        let comments = await item.findElement(By.css('.stats .stats-comments')).getText()
        comments.length > 1 ? comments = comments.substring(2, comments.length - 3) : comments = '0'
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
      console.log(`${currPage}页爬取成功,共${results.length}条数据。`)
      currPage++;
      if (currPage <= maxPage) {
        await driver.findElement(By.css('.pagination li:nth-of-type(8)>a>.page-numbers')).click()
        getData()
      }

    } catch (e) {
      flag = false
    } finally {
      if (flag) break
    }
  }

}


module.exports = {qiubai}

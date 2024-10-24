const {driver, By, Key, until} = require('./index');
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
let currPage = 1;
let maxPage = 50; //百思不得姐 已知最多50页

async function baisi(param) {
  try {
    await driver.get(crawlerJson['baisi']);
    currPage = 1;
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
      let items = await driver.findElements(By.css('.j-content .g-bd .g-mn .j-r-list>ul>li'))
      // 迭代数组, 获取我们所需要的数据
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let title = await item.findElement(By.css('.j-r-list-c .j-r-list-c-desc')).getText()
        let imgs = await item.findElements(By.css('.j-r-list-c .j-r-list-c-img a>img'))
        let imgsUrl = []
        for (let i = 0; i < imgs.length; i++) {
          let url = await imgs[i].getAttribute('data-original')
          imgsUrl.push(url)
        }
        imgsUrl.length === 0 ? imgsUrl = "" : imgsUrl = JSON.stringify(imgsUrl)
        let old_like = await item.findElement(By.css('.j-r-list-tool .j-r-list-tool-l .j-r-list-tool-l-up span')).getText()
        let comments = await item.findElement(By.css('.j-r-list-tool .j-r-list-tool-r .comment-counts')).getText()
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
      console.log(`${currPage}页爬取成功,共${items.length}条数据。`)
      currPage++;
      if (currPage <= maxPage) {
        await driver.findElement(By.css('.j-page .pagenxt')).click()
        getData()
      }

    } catch (e) {
      flag = false
    } finally {
      if (flag) break
    }
  }

}


module.exports = {baisi}

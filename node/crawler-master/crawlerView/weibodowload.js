const { driver, By, Key, until } = require('./index')
const fs = require('fs')
const download = require('download')
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
const { getParamObj } = require('../config/unitls')
// const {Options} = require('selenium-webdriver/chrome');
// // const options = new Options()
// // options.addArguments(crawlerJson.web.cookie).addArguments(crawlerJson.web.userA)

let currPage = 1
let maxPage = 100
let renderFlag = 1

async function weibod () {
  try {
    await driver.get(crawlerJson['weibo'] + '&page=' + currPage)
    await driver.sleep(8000)
    await renderMore() //向下滚动 加载全部
  } finally {
    // await driver.quit();
  }
}

async function renderMore () {
  if (renderFlag > 4) {
    await getData()
    return false
  } else {
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
    await driver.sleep(1000)
    renderFlag++
    renderMore()
  }
}

async function getData () {
  // while (true) {
  console.log(`----------------当前第${currPage}页，总共${maxPage}页-------------------`)
  let flag = true
  try {
    let items = await driver.findElements(By.css('.WB_miniblog_fb #plc_frame #plc_main .WB_frame_c  .WB_feed .WB_feed_type'))
    console.log('item', items.length)
    // 迭代数组, 获取我们所需要的数据
    for (let i = 0; i < items.length; i++) {
      try {
        let item = await items[i].findElement(By.css('.WB_feed_detail .WB_detail'))
        let title = await item.findElement(By.css('.WB_text')).getText()
        let nickName = await item.findElement(By.css('.WB_text')).getAttribute('nick-name')
        let type = 0
        let imgsUrl = []
        // title.indexOf('视频') >= 0 || || title.indexOf(nickName) >= 0
        if (title.indexOf('查看全部') >= 0 || title.indexOf('投票') >= 0 || title.indexOf('网友') >= 0) {
          continue
        }
        else if (title.indexOf(nickName) >= 0) {
          // imgsUrl[0] = await item.findElement(By.css('.WB_media_wrap ul li img')).getAttribute('src')
          let videoSrc = await item.findElement(By.css('.WB_media_wrap ul li')).getAttribute('action-data')
          videoSrc = videoSrc.substring(videoSrc.indexOf('%2F%2Ff.video.weibocdn.com'), videoSrc.indexOf('&cover_img'))
          imgsUrl[0] = decodeURIComponent(videoSrc)
          type = 2
        }
        else {
          let data = await item.findElement(By.css('.WB_media_wrap .media_box ul')).getAttribute('action-data')
          data = getParamObj(data)
          imgsUrl = data.clear_picSrc.split(',')
          type = 1
        }
        imgsUrl.length === 0 ? imgsUrl = '' : ''
        const currTitle = await driver.getTitle()
        fs.mkdir(`../../images/${currTitle}`, function (err) {
          if (err) {
            return console.error(err)
          }
          console.log(`${currTitle}目录创建成功`)
        })
        console.log(imgsUrl)
        await Promise.all(imgsUrl.map(url => download('https:' + url, `../../images/${currTitle}`).then(async () => {
          console.log('done!')
        }).catch((e) => {
          console.log('下载出错了-------')
        })))
      } catch (e) {
        continue
      }
    }
    console.log(`${currPage}页爬取成功,共${items.length}条数据。`)
    currPage++;
    renderFlag = 1
    if (currPage <= maxPage) {
      await driver.findElement(By.css('.WB_cardwrap .W_pages .next')).click()
      await driver.get(crawlerJson['weibo'] + '&page=' + currPage);
      await driver.sleep(4000)
      renderMore()
    }

  } catch (e) {
    flag = false
  } finally {
    // if (flag) break
  }
  // }
}

module.exports = { weibod }

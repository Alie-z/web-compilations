const { driver, By, Key, until } = require('./index')
const fs = require('fs')
const download = require('download')
const crawlerJson = require('../config/crawlerJson')
const { getParamObj } = require('../config/unitls')

let currPage = 1
let maxPage = 100
let renderFlag = 1
let currTitle, currDowNum = 0

async function weibocom () {
  try {
    await driver.get(crawlerJson['weibocom'])
    await driver.sleep(8000)
    currTitle = await driver.getTitle()
    fs.mkdir(`../../images/${currTitle}`, function (err) {
      if (err) {
        return console.error(err)
      }
      console.log(`${currTitle}目录创建成功`)
    })
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
    let items = await driver.findElements(By.css('#plc_frame #plc_main .WB_frame_c .WB_feed .repeat_list .list_box .list_ul .list_li .list_con .WB_pic img'))
    console.log('item', items.length)
    // 迭代数组, 获取我们所需要的数据
    for (let i = currDowNum; i < items.length; i++) {
      try {
        let imgsUrl = []
        const imgUrl = await items[i].getAttribute('src')
        imgsUrl.push(imgUrl.replace(/thumb180/,'bmiddle'))
        console.log(imgsUrl)
        await Promise.all(imgsUrl.map(url => download(url, `../../images/${currTitle}`).then(async () => {
          console.log('done!')
        }).catch((e) => {
          console.log('下载出错了-------')
        })))
      } catch (e) {
        continue
      }
    }
    console.log(`${currPage}页爬取成功,共${items.length}条数据。`)
    currPage++
    renderFlag = 1
    if (currPage <= maxPage) {
      currDowNum = items.length
      await driver.findElement(By.css('#plc_frame #plc_main .WB_frame_c .WB_feed .repeat_list .list_box .list_ul .WB_cardmore')).click()
      await driver.sleep(1000)
      renderMore()
    }

  } catch (e) {
    flag = false
  } finally {
    // if (flag) break
  }
  // }
}

module.exports = { weibocom }

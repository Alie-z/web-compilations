const { driver, By, Key, until } = require('./index')
const download = require('download')
const fs = require('fs')
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')
const { getParamObj } = require('../config/unitls')
let options = driver.manage()

let currPage = 1
let currNum = 0
let renderFlag = 1
let handle2, handle1

async function weixingif () {
  try {
    // dowgif('https://mp.weixin.qq.com/s?__biz=Mzg5NzA3NTA0NQ==&mid=2247484333&idx=1&sn=315ba4edf064af2bcaa834fe08950eb6&chksm=c07611a7f70198b184dc1327f37eb033e52acce6e821619102b3c01904a03f4e3ac252b6db4f&scene=38#wechat_redirect')
    await driver.get('https://mp.weixin.qq.com/s?__biz=Mzg5NzA3NTA0NQ==&mid=2247484296&idx=5&sn=da4db2b9165dd5c8dfe9234e85eedb7c&chksm=c0761182f70198943f64cb5020483a1c49a688b82b9cf6baf6a7c5ced5bf7804345c58f374ed&scene=27#wechat_redirect')
    options.addCookie({
      name: 'wap_sid2',
      value: 'CN2Bn9oJElxyOTNDSzVHUUE3SzBwelY4N1dHYlp5Y1FqUHRxRFk1eGtqczQ0SXJmVDJRN1c4d1VVejlDNURKaFdNbGVfbHlzaHFhQm1Xc1JSUGs2MzBNSG1mTjFKQklFQUFBfjDc1s/wBTgNQAE='
    })
    await driver.sleep(500)
    await driver.get('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg5NzA3NTA0NQ==&scene=124&#wechat_redirect')
    handle1 = await driver.getWindowHandle()

    getData()
  } finally {
    // await driver.quit();
  }
}

async function renderMore () {
  await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
  await driver.sleep(1000)
  getData()
}

async function getData () {
  console.log(`----------------当前第${currNum}条-------------------`)
  try {
    let items = await driver.findElements(By.css('#js_container #js_history_list .weui_msg_card .weui_msg_card_bd .weui_media_box'))
    console.log('item', items.length)
    if (currNum == items.length) {
      console.log('没了 下滑')
      renderMore()
    } else {
      let hrefs = await items[currNum].findElement(By.css('.weui_media_title')).getAttribute('hrefs')
      dowgif(hrefs)
    }
  } catch (e) {
  }
}

async function dowgif (hrefs) {
  const newWindow = `window.open("${hrefs}")`
  await driver.executeScript(newWindow)
  const handles = await driver.getAllWindowHandles()
  // console.log('handles--', handles)
  await driver.sleep(5000)
  handles.map((item, index) => {
    if (item !== handle1) handle2 = item
  })
  await driver.switchTo().window(handle2)
  let imgsUrl = []
  const currTitle = await driver.getTitle()
  const imgs = await driver.findElements(By.css('#img-content .rich_pages'))
  if (imgs.length < 5) {
    imgsUrl[0] = await driver.wait(until.elementLocated(By.css('#img-content .rich_media_content img')), 2000).getAttribute('data-src')
    console.log('url', imgsUrl[0])
    download(imgsUrl[0]).then(data => {
      fs.writeFileSync(`../../gif/${currNum}.gif`, data)
    }).catch((e) => {
      console.log('下载出错了-------')
    }).finally(async () => {
      await driver.close()
      await driver.switchTo().window(handle1)
      currNum++
      getData()
    })
  } else {
    // const imgs = await driver.findElements(By.css('#img-content .rich_pages'))
    for (let i = 0; i < imgs.length; i++) {
      let imgUrl = await imgs[i].getAttribute('data-src')
      if (imgUrl) imgsUrl.push(imgUrl)
    }
    fs.mkdir(`../../images/${currTitle}`, function (err) {
      if (err) {
        return console.error(err)
      }
      console.log(`${currTitle}目录创建成功`)
    })
    let imgNum = 1
    await Promise.all(imgsUrl.map(url => download(url).then(async (data) => {
        fs.writeFileSync(`../../images/${currTitle}/${imgNum}.jpeg`, data)
        imgNum++
      }).catch((e) => {
        console.log('下载出错了-------')
      })
    ))
    await driver.close()
    await driver.switchTo().window(handle1)
    currNum++
    getData()
  }
}

module.exports = { weixingif }


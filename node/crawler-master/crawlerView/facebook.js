const { driver, By, Key, until } = require('./index')
const CrawlerMuodel = require('../crawlerStore/crawler')
const crawlerJson = require('../config/crawlerJson')

let currPage = 1, flag = 1
let globalData

async function facebook () {
  try {
    // await driver.get(crawlerJson['facebook'])
    // await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
    // await driver.sleep(2000)
    // await driver.wait(until.elementLocated(By.css('#globalContainer #email')), 50000).sendKeys('vicky@goodstar.vip')
    // await driver.findElement(By.css('#globalContainer #pass')).sendKeys('xiexie0.0')
    // await driver.findElement(By.css('#globalContainer #loginbutton')).click()
    await driver.get(crawlerJson['facebook'])
    globalData = await driver.findElement(By.css('#globalContainer #content_container .clearfix ._14i5 ._1xnd'))
    await driver.sleep(1000)
    const pop = await driver.findElements(By.css('.uiLayer'))
    if (pop.length == 1) await pop[0].click()
    await getData()
  } finally {
    // await driver.quit();
  }
}

async function renderMore () {
  await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)')
  await driver.sleep(6000)
  globalData = await globalData.findElements(By.css('._1xnd'))
  if (globalData.length > 0) {
    globalData = globalData[globalData.length - 1]
    await driver.sleep(100)
    await getData()
  } else {
    if (flag === 4) await driver.quit()
    flag++
    renderMore()
  }
}

async function getData () {
  // if (currPage < 2) {
  //   pageAdd()
  //   return
  // }
  try {
    let currData = await globalData.findElements(By.css('._427x'))
    // 迭代数组, 获取我们所需要的数据
    for (let i = 0; i < currData.length; i++) {
      try {
        console.log(`-------------当前第${currPage}页,第${i + 1}条------------`)
        let item = await currData[i].findElement(By.css('.userContentWrapper'))
        let title = await item.findElement(By.css('.userContent p')).getText()
        let isLink = await item.findElements(By.css('.mtm ._3n1k'))
        title = title.split('--------------')[0]
        let videoUrl, video_time, source, videoImgUrl
        source = await driver.getTitle()
        source = source.split('-')[0]
        const flag = title.indexOf('展开') >= 0
        if (flag || isLink.length == 1) continue
        let imgsUrl = []
        try {
          videoImgUrl = await item.findElement(By.css('.mtm img')).getAttribute('src')
          videoUrl = await item.findElement(By.css('.fsm a')).getAttribute('href')
          videoUrl = videoUrl.split('/?')[0].split('videos/')[1]
          const video_times = await item.findElements(By.css('.fsm a'))
          video_time = await video_times[video_times.length - 1].getAttribute('aria-label')
          if (video_time.indexOf('时长') < 0) continue
          video_time = video_time.split('时长：')[1]
        } catch (e) {
          try {
            let imgs = await item.findElements(By.css('.mtm a'))
            if (imgs.length === 0) continue
            for (let i = 0; i < imgs.length; i++) {
              let imgUrl = await imgs[i].getAttribute('data-ploi')
              if (imgUrl) imgsUrl.push(imgUrl)
            }
          } catch (e) {
            console.log('img 没有--------------')
            continue
          }
        }
        if (videoUrl) {
          const params = {
            source: 'facebook-' + source,
            video_id: videoUrl,
            title,
            url: 'https://www.facebook.com/watch/?v=' + videoUrl,
            img_url: videoImgUrl,
            video_time
          }
          console.log('视频---------', params)
          await CrawlerMuodel.createcrawlerVideo(params)
        } else {
          if(imgsUrl.length == 0) continue
          const params = {
            source: 'facebook-' + source,
            title,
            url: crawlerJson['facebook'],
            imgs: JSON.stringify(imgsUrl),
          }
          console.log('段子-----------', params)
          await CrawlerMuodel.createcrawlerFb(params)
        }
      } catch (e) {
        console.log('没有可用字段---------------')
        continue
      }
    }
    console.log(`${currPage}页爬取成功,共${currData.length}条数据。`)
    pageAdd()
  } catch (e) {
    console.log('爬取错误！！！！！！！！！！！', e)
  }
}

function pageAdd () {
  console.log(`------${currPage}页-------`)
  currPage++
  if (currPage < 200) renderMore()
}

module.exports = { facebook }

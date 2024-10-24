const http = require('http')
const superagent = require('superagent')
const cheerio = require('cheerio')

let ins = function () {
  console.log('aaaaaaaa')
  superagent.get('https://www.instagram.com/captainmiao/').end(function (error, data) {
    if (error) {
      console.log('error exception occured !')
    }
    console.log('data', data)
    // var $ = cheerio.load(data.text) //注意传递的是data.text而不是data本身
    // var arr = []
    // $('#topic_list .topic_title').each(function (idx, element) {
    //   var $element = $(element)
    //   arr.push({
    //     'title': $element.attr('title'),
    //     'href': $element.attr('href')
    //   })
    // })
    // resp.send(arr)
  })
  // let req = http.request('https://www.instagram.com/captainmiao/', res => {
  //   console.log('111')
  //   let chunks = []
  //   res.on('data', chunk => {
  //     console.log('222')
  //     chunks.push(chunk)
  //   })
  //   res.on('end', () => {
  //     console.log('333')
  //     // console.log(Buffer.concat(chunks).toString('utf-8'))
  //     let html = Buffer.concat(chunks).toString('utf-8')
  //     console.log(html)
  //     // let $ = cheerio.load(html)
  //     // let imgArr = Array.prototype.map.call($('.tea_main .tea_con .li_img > img'), (item) => 'http://web.itheima.com/' + $(item).attr('src'))
  //     // console.log(imgArr)
  //     // let imgArr = []
  //     // $('.tea_main .tea_con .li_img > img').each((i, item) => {
  //     //   let imgPath = 'http://web.itheima.com/' + $(item).attr('src')
  //     //   imgArr.push(imgPath)
  //     // })
  //     // console.log(imgArr)
  //   })
  // })
  // req.end()

}

module.exports = { ins }

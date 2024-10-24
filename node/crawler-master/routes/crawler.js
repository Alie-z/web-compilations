const router = require('koa-router')()
const {qiubai} = require('../crawlerView/qiubai')
const {baisi} = require('../crawlerView/baisi')
const {zuiyou} = require('../crawlerView/zuiyou')
const {weibo} = require('../crawlerView/weibo')
const {weibod} = require('../crawlerView/weibodowload')
const {weibocom} = require('../crawlerView/weibocomdowload')
const {facebook} = require('../crawlerView/facebook')
const {youtube} = require('../crawlerView/youtube')
const {youtubedowload} = require('../crawlerView/youtubedowload')
const {weixingif} = require('../crawlerView/weixingif')
// const {test} = require('../crawlerView/test')
const {ins} = require('../crawlerView/instagram')
const CrawlerMuodel = require('../crawlerStore/crawler')
const download = require('download')
router.get('/qiubai/:id', async (ctx, next) => {
  let param = ctx.params.id;
  try {
    await qiubai(param)
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/baisi', async (ctx, next) => {
  try {
    await baisi()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/ins', async (ctx, next) => {
  try {
    await ins()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/zuiyou', async (ctx, next) => {
  try {
    await zuiyou()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/weibo', async (ctx, next) => {
  try {
    await weibo()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/weibod', async (ctx, next) => {
  try {
    await weibod()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/weibocom', async (ctx, next) => {
  try {
    await weibocom()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/test', async (ctx, next) => {
  try {
    await test()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/facebook', async (ctx, next) => {
  try {
    await facebook()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/youtube/:id', async (ctx, next) => {
  try {
    let id = ctx.params.id;
    await youtube(id)
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/youtubedowload/:id', async (ctx, next) => {
  try {
    let id = ctx.params.id;
    await youtubedowload(id)
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

router.get('/weibodtest', async (ctx, next) => {
  try {
    await dow()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})
router.get('/wxgif', async (ctx, next) => {
  try {
    await weixingif()
    ctx.body = {
      success: true,
      data: '爬取成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

async function dow() {
  await Promise.all(['//wx4.sinaimg.cn/mw690/9cdc435cly1g71f4n7yp2j20b40b4abr.jpg',
    '//wx4.sinaimg.cn/mw690/9cdc435cly1g71f4mtb0bj20b40b4wg7.jpg']
    .map(url => download('https:' + url, 'weiboImg').then(async () => {
      console.log('done!');
    }).catch((e) => {
      console.log('下载出错了-------')
    })));

  // download('https://wx4.sinaimg.cn/mw690/9cdc435cly1g71f4n7yp2j20b40b4abr.jpg', 'huabanImg').then(async () => {
  //   console.log('done!');
  // }).catch((e) => {
  //   console.log('下载出错了-------')
  // })
}

router.get('/find/:id', async (ctx, next) => {
  let id = ctx.params.id * 1;
  try {
    let data = (await CrawlerMuodel.getcrawler(id))[0]
    data.imgs = JSON.parse(data.imgs)
    ctx.body = {
      code: 200,
      success: true,
      data
    }
  } catch {
    ctx.body = {
      code: -1000,
      success: '查询失败！'
    }
  }
})

router.get('/finds', async (ctx, next) => {
  try {
    let data = await CrawlerMuodel.getcrawlerall()
    data.forEach(function (item, index) {
      if (item.imgs && item.imgs !== null) {
        data[index].imgs = eval(item.imgs)
      }
    })
    ctx.body = {
      code: 200,
      success: true,
      data
    }
  } catch {
    ctx.body = {
      code: -1000,
      success: '查询失败！'
    }
  }
})

router.get('/add', async (ctx, next) => {
  let {title, likes, pinglun, imgs} = ctx.query
  console.log(title, likes, pinglun, imgs)
  if (title) {
    try {
      const params = {
        title,
        likes,
        pinglun,
        imgs
      }
      await CrawlerMuodel.createcrawler(params)
      ctx.body = {
        code: 200,
        success: true,
        data: params
      }
    } catch {
      ctx.body = {
        code: -1000,
        success: '添加失败！'
      }
    }
  } else {
    ctx.body = {
      code: -1000,
      msg: '请输入段子名称！'
    }
  }
})

module.exports = router

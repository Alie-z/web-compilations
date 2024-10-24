const router = require('koa-router')()
const {dowVideo} = require('../crawlerView/dowVideo')
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/dowVideo',async function (ctx, next) {
  try {
    await dowVideo()
    ctx.body = {
      success: true,
      data: '下载成功！！'
    }
  } catch {
    ctx.body = {
      success: 'false dowload'
    }
  }
})

module.exports = router

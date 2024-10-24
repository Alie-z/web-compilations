const router = require('koa-router')()
const { _getBizhiType, _storeMyData } = require('../aibizhi/bizhi_type')
const { _storeMyImg } = require('../aibizhi/aibizhi')

router.get('/getBizhiType', async function (ctx, next) {
  try {
    let data = await _getBizhiType()
    console.log('data', data)
    ctx.body = {
      code: 200,
      success: true,
      data
    }
  } catch {
    ctx.body = {
      code: -1000,
      success: '操作失败！'
    }
  }
})
router.get('/storeMyData', async function (ctx, next) {
  try {
    await _storeMyData()
    ctx.body = {
      code: 200,
      success: true
    }
  } catch {
    ctx.body = {
      code: -1000,
      success: '操作失败！'
    }
  }
})
router.get('/createAibizhi', async function (ctx, next) {
  try {
    await _storeMyImg()
    ctx.body = {
      code: 200,
      success: true
    }
  } catch {
    ctx.body = {
      code: -1000,
      success: '操作失败！'
    }
  }
})

module.exports = router

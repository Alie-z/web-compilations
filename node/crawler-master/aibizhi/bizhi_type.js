const request = require('superagent')
const aibizhiTypeModel = require('../crawlerStore/aibizhi')

async function _getBizhiType () {
  return new Promise((resolve => {
    request
      .get('http://service.aibizhi.adesk.com/v1/wallpaper/category')
      .set('Accept', 'application/json')
      .then(res => JSON.parse(res.text))
      .then(res => {
        const data = res.res.category
        resolve(data)
      })
  }))
}

async function _storeMyData () {
  const data = await _getBizhiType()
  for (const item of data) {
    // console.log(item)
    item.filter = JSON.stringify(item.filter)
    await aibizhiTypeModel.createAbizhiType(item)
  }
}

module.exports = { _getBizhiType, _storeMyData }

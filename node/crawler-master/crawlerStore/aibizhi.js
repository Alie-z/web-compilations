const db_aibizhi = require('../config/db_aibizhi')
// 引入Sequelize对象
const Sequelize = db_aibizhi.sequelize
// 引入上一步的文章数据表模型文件
const crawler_aibizhi = Sequelize.import('../schema/crawler_aibizhi')
const crawler_aibizhi_type = Sequelize.import('../schema/crawler_aibizhi_type')

class AibizhiMuodel {
  /**
   * 添加createAbizhiType
   * @param
   * @returns {Promise<*>}
   */
  static async createAbizhiType (data) {
    return await crawler_aibizhi_type.create(data)
  }

  /**
   * 添加Aibizhi
   * @param
   * @returns {Promise<*>}
   */
  static async createAibizhi (data) {
    // console.log(data)
    return await crawler_aibizhi.create(data)
  }

}

module.exports = AibizhiMuodel

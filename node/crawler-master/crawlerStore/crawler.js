// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db')
const db_self = require('../config/db_self')
// 引入Sequelize对象
const Sequelize = db.sequelize
const SequelizeSelf = db_self.sequelize
// 引入上一步的文章数据表模型文件
const Crawler = Sequelize.import('../schema/crawler')
const CrawlerVideo = Sequelize.import('../schema/crawler_video')
const CrawlerVideoSelf = SequelizeSelf.import('../schema/crawler_video_self')

class CrawlerMuodel {
  /**
   * 添加段子
   * @param data 0文字，1图文，2视频
   * @returns {Promise<*>}
   */
  static async createcrawler (data) {
    return await Crawler.create({
      title: data.title,
      imgs: data.imgs,
      old_like: data.old_like,
      pinglun: data.pinglun,
      type: data.type
    })
  }

  /**
   * 添加facebook段子
   * @param data 0文字，1图文，2视频
   * @returns {Promise<*>}
   */
  static async createcrawlerFb (data) {
    console.log('段子存储中~~')
    return await Crawler.create({
      time: Date.parse(new Date()) / 1000,
      title: data.title,
      content: data.title,
      imgs: data.imgs,
      source: data.source,
      url: data.url,
    })
  }

  /**
   * 添加视频
   * @param data 0文字，1图文，2视频
   * @returns {Promise<*>}
   */
  static async createcrawlerVideo (data) {
    return await CrawlerVideo.create({
      time: Date.parse(new Date()) / 1000,
      source: data.source,
      video_id: data.video_id,
      title: data.title,
      url: data.url,
      img_url: data.img_url,
      video_time: data.video_time
    })
  }

  /**
   * 添加视频
   * @param data 0文字，1图文，2视频
   * @returns {Promise<*>}
   */
  static async createcrawlerVideoSelf (data) {
    return await CrawlerVideoSelf.create({
      time: Date.parse(new Date()) / 1000,
      source: data.source,
      video_id: data.video_id,
      title: data.title,
      url: data.url,
      img_url: data.img_url,
      video_time: data.video_time
    })
  }

  /**
   * 查询单条段子
   * @param id  ID
   * @returns {Promise<Model>}
   */
  static async getcrawlerSelf (id) {
    return await CrawlerVideoSelf.findAll({
      where: {
        id,
      },
    })
  }

  /**
   * 查询单条段子
   * @param id  ID
   * @returns {Promise<Model>}
   */
  static async getcrawler (id) {
    return await Crawler.findAll({
      where: {
        id,
      },
    })
  }

  /**
   * 查询全部
   * @returns {Promise<*>}
   */
  static async getcrawlerall () {
    return await Crawler.findAll()
  }
}

module.exports = CrawlerMuodel

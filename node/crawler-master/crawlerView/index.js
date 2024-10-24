
const { Options } = require('selenium-webdriver/chrome')
const options = new Options()
options.headless()
options.windowSize({ width: 100, height: 100 })
// console.log('---', Options)
// options.addArguments('headless')

const { Builder, By, Key, until } = require('selenium-webdriver')

const driver = new Builder()
  .forBrowser('chrome')
  .build()

module.exports = { driver, By, Key, until }


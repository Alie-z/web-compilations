/* eslint-disable */

import mockClient from 'dynamic-mocker/lib/client.js'

var config = require('./mock-config.js')

mockClient.setup(config, {
  '/getProducts': require('./root/getProducts.js'),
  '/buyProducts': require('./root/buyProducts.js'),
  '/api/test_data': require('./root/api/test_data.js'),
  '/api/test_api': require('./root/api/test_api.js'),
  '/api/getMenus': require('./root/api/getMenus.js'),
  '/api/getInfo': require('./root/api/getInfo.js')
})

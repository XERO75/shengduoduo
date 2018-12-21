var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"http://192.168.50.136/api"'
  BASE_API:'"http://192.168.50.45:81/api"'
  // BASE_API:'"http://dyd.hboxs.com"'
})

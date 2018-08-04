const { join } = require('path')
const axios = require('axios')

module.exports = {
  plugins: ['~/plugins/renders'],
  build: {
  	watch: ['../dist/__api']
  }
}

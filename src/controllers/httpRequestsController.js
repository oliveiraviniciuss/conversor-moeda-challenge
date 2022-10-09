const axios = require('axios')

const httpGet = async (url) => {
  return axios.get(url)
}

module.exports = {
  httpGet
}

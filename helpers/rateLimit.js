const hapiRateLimit = require('hapi-rate-limit')

module.exports = {
  rateLimit: {
    plugin: hapiRateLimit,
    options: {
      pathLimit: 'true',
      userLimit: 30,
      userCache: {
        expiresIn: 1 * 1000
      }
    }
  }
}

const jwt = require('jsonwebtoken')
require('dotenv').config()

function sign (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' })
}

function verify (token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  sign,
  verify
}

// TODO fungsi penanganan untuk ML
const fs = require('fs')
const Boom = require('@hapi/boom')
const createHistory = require('./historyControllers')
module.exports = {
  predict: async (request, h) => {
    try {
      const userId = request.auth.credentials.id
      const { imageBase64 } = request.payload
      const imagePath = 'gambar.jpg'
      const imageData = Buffer.from(imageBase64, 'base64')
      fs.writeFileSync(imagePath, imageData)
      fs.readFileSync(imagePath)
      fs.unlinkSync(imagePath)
      createHistory.createHistory(userId, imagePath)
      return h.response({
        message: 'gambar diterima'
      })
    } catch (error) {
      throw Boom.badData()
    }
  }
}

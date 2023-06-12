// TODO fungsi penanganan untuk ML
const Boom = require('@hapi/boom')
const createHistory = require('./historyControllers')
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const { penanganan } = require('../models')

module.exports = {
  predict: async (request, h) => {
    try {
      // Mendapatkan userId dan userEmail
      const userId = request.auth.credentials.id
      // Mendapatkan imageBase64
      const { imageBase64 } = request.payload
      // Konversi base64 ke Buffer
      const imageData = Buffer.from(imageBase64, 'base64')
      // Konversi gambar menggunakan sharp
      const convertedImageBuffer = await sharp(imageData)
        .toFormat('jpg')
        .toBuffer()
      // Membuat unik number
      const imageNumber = Math.floor(Math.random() * 1000) + 1
      // Membuat fileName
      const fileName = `${userId}_${imageNumber}.jpg`
      // Menyimpan gambar ke direktori lokal
      const tempDir = path.join(__dirname, 'temp')
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir)
      }
      const imagePath = path.join(tempDir, fileName)
      fs.writeFileSync(imagePath, convertedImageBuffer)

      // Perform HTTP POST request to localhost:5000/predict
      const apiUrl = 'http://localhost:5000/predict'
      const requestData = {
        imagePath
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
      const responseData = await response.json()
      createHistory.createHistory(userId, responseData.prediction)
      // TODO Penanganan
      const hasil = await penanganan.findOne({
        where: {
          penyakit: responseData.prediction
        },
        attributes: ['penyakit', 'penanganan']
      })
      fs.unlinkSync(imagePath)
      return h.response({
        penyakit: hasil.penyakit,
        penanganan: hasil.penanganan
      })
    } catch (error) {
      console.log(error)
      throw Boom.badData()
    }
  }
}

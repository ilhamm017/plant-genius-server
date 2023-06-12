const Boom = require('@hapi/boom')
const { History } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  createHistory: async (userId, result) => {
    await History.create({
      userId, result
    })
  },
  listHistory: async (request, h) => {
    try {
      const userId = request.auth.credentials.id
      const history = await History.findAll({
        where: {
          userId
        },
        attributes: ['id', 'result']
      })
      return h.response({
        history
      }).code(200)
    } catch (error) {
      throw Boom.badRequest(error)
    }
  },
  deleteHistory: async (request, h) => {
    try {
      const { historyIds } = request.payload
      await History.destroy({
        where: {
          id: {
            [Op.in]: historyIds
          }
        }
      })
      return h.response({
        message: 'History berhasil dihapus !'
      })
    } catch (error) {
      throw Boom.badRequest(error)
    }
  }
}

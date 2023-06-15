const { Authentication } = require('../middleware/Authentication')
const { listHistory, deleteHistoryById, getHistoryById } = require('../controllers/historyControllers')
const historyRoutes = [
  {
    path: '/getHistory/{id}',
    method: 'get',
    handler: getHistoryById,
    options: {
      pre: [Authentication]
    }
  },
  {
    path: '/getHistory',
    method: 'get',
    handler: listHistory,
    options: {
      pre: [Authentication]
    }

  },
  {
    path: '/deleteHistory/{id}',
    method: 'post',
    handler: deleteHistoryById,
    options: {
      pre: [Authentication]
    }
  }
]

module.exports = {
  historyRoutes
}

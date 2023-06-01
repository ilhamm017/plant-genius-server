const { Authentication } = require('../middleware/Authentication')
const { listHistory, deleteHistory } = require('../controllers/historyControllers')
const historyRoutes = [
  {
    path: '/getHistory',
    method: 'get',
    handler: listHistory,
    options: {
      pre: [Authentication]
    }

  },
  {
    path: '/deleteHistory',
    method: 'post',
    handler: deleteHistory,
    options: {
      pre: [Authentication]
    }
  }
]

module.exports = {
  historyRoutes
}

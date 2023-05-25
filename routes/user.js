const userController = require('../controllers/userControllers')

const userRoutes = [
  {
    path: '/register',
    method: 'POST',
    handler: userController.signUp
  },
  {
    path: '/login',
    method: 'POST',
    handler: userController.login
  },
  {
    path: '/logout',
    method: 'POST',
    handler: userController.logout
  }
]

module.exports = { userRoutes }

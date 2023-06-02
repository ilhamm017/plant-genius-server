const { User } = require('../models')
const { blockedToken } = require('../models')
const { hash, compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')
const { validatePassword, validateEmail, validateName, validateNo_telepon } = require('../helpers/validate')

const userController = {

  signUp: async (request, h) => {
    try {
      let { name, email, password, no_telepon } = request.payload
      email = email.toLowerCase()

      const errors = new Map() // Menyimpan kesalahan yang terjadi
      validateEmail(email, errors)
      validateName(name, errors)
      validateNo_telepon(no_telepon, errors)
      validatePassword(password, errors)

      const verifyEmailUser = await User.findOne({
        where: {
          email
        }
      })

      if (verifyEmailUser) {
        if (!errors.has('email')) {
          errors.set('email', [])
        }
        errors.set('email', { message: 'Email already registered' })
      }

      const verifyPhoneUser = await User.findOne({ where: { no_telepon } })
      if (verifyPhoneUser) {
        if (!errors.has('no_telepon')) {
          errors.set('no_telepon', [])
        }
        errors.get('no_telepon').push({ message: 'Phone number already registered '})
      }

      if (errors.size > 0) {
        const errorDetails = Object.fromEntries(errors)

        return h.response({
          message: 'Validation Error',
          details: errorDetails
        }).code(400)
      }

      password = hash(password)

      const createUser = await User.create({ name, email, password, no_telepon })
      return h.response({
        User: createUser
      }).code(201)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errorDetails = {}

        error.errors.forEach((err) => {
          const { path, message } = err
          if (!errorDetails[path]) {
            errorDetails[path] = []
          }
          errorDetails[path].push(message)
        })

        return h.response({
          message: 'Validation Error',
          details: errorDetails
        }).code(400)
      } else {
        return h.response({
          message: error.message
        }).code(400)
      }
    }
  },

  login: async (request, h) => {
    try {
      let { password, email, no_telepon } = request.payload
      let verifyUser

      if (email) {
        email = email.toLowerCase()
        verifyUser = await User.findOne({
          where: {
            email
          },
          attributes: ['id', 'email', 'password']
        })

        if (!verifyUser) {
          return h.response({
            message: 'Email tidak terdaftar'
          }).code(400)
        }
      } else if (no_telepon) {
        verifyUser = await User.findOne({
          where: {
            no_telepon
          },
          attributes: ['id', 'no_telepon', 'password']
        })

        if (!verifyUser) {
          return h.response({
            message: 'Nomor telefon tidak terdaftar'
          }).code(400)
        }
      } else {
        return h.response({
          message: 'Email atau nomor telefon diperlukan'
        }).code(400)
      }

      if (!compare(password, verifyUser.password)) {
        return h.response({
          message: 'Password salah!'
        }).code(400)
      }

      const token = await sign({
        id: verifyUser.id,
        email: verifyUser.email,
        no_telepon: verifyUser.no_telepon
      })

      return h.response({
        token: token
      })
    } catch (error) {
      return h.response({
        message: error.message
      }).code(500)
    }
  },

  logout: async (request, h) => {
    try {
      const token = request.headers.authorization
      if (!token) {
        return h.response({
          message: 'Token tidak ditemukan'
        }).code(403)
      }

      /* `const expiredAt = new Date(request.auth.credentials.exp * 1000)` is converting the expiration
      time of the JWT token (which is in Unix timestamp format) to a JavaScript Date object. The
      `request.auth.credentials.exp` is the expiration time of the JWT token in Unix timestamp
      format, which is the number of seconds since January 1, 1970, 00:00:00 UTC. Multiplying it by
      1000 converts it to milliseconds, which is the format required by the `Date` constructor. The
      resulting `expiredAt` variable is a JavaScript Date object representing the expiration time of
      the JWT token. */
      const expiredAt = new Date(request.auth.credentials.exp * 1000)
      await blockedToken.create({ token, expiredAt })

      return h.response({
        message: 'Logout Berhasil'
      }).code(200)
    } catch (error) {
      return h.response({
        message: error.message
      }).code(500)
    }
  }
}

module.exports = userController

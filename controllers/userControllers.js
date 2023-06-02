const { User } = require('../models')
const { blockedToken } = require('../models')
const { hash, compare } = require('../helpers/hash')
const { sign } = require('../helpers/jwt')
const { passwordSchema } = require('../helpers/passwordSchema')
const Boom = require('@hapi/boom')

const userController = {
  signUp: async (request, h) => {
    try {
      let { name, email, password, no_telepon } = request.payload
      email = email.toLowerCase() // membuat email menjadi lowercase
      const verifyEmailUser = await User.findOne({ where: { email } }) // verifikasi email apakah email sudah ada atau belum dari database
      if (verifyEmailUser) {
        return h.response({
          message: 'Email already registered'
        })
      }
      const { error: passwordError } = passwordSchema.validate(password)
      if (passwordError) {
        return h.response({
          message: passwordError.details[0].message
        })
      }
      password = hash(password)
      const createUser = await User.create({ name, email, password, no_telepon }) // memasukkan name, email, password ke dalam database sebagai pengguna baru, lalu memasukkan datanya ke dalam variabel createUser
      return h.response({
        User: createUser
      }).code(201)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const validationError = Boom.badData('Validation Error')
        const errorDetails = {}

        error.errors.forEach((err) => {
          const { path, message } = err
          if (!errorDetails[path]) {
            errorDetails[path] = []
          }
          errorDetails[path].push(message)
        })

        validationError.output.payload.details = errorDetails
        throw validationError
      } else {
        throw Boom.badRequest(error.message)
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
      } else if (no_telepon) {
        verifyUser = await User.findOne({
          where: {
            no_telepon
          },
          attributes: ['id', 'no_telepon', 'password']
        })
      } else {
        return h.response({
          message: 'Email atau nomor telefon tidak terdaftar'
        })
      }
      if (!compare(password, verifyUser.password)) {
        throw Boom.unauthorized('Password salah')
      }
      console.log(verifyUser)

      const token = await sign({
        id: verifyUser.id,
        email: verifyUser.email
      })
      return h.response({
        token
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
        throw Boom.forbidden({
          message: 'token tidak ditemukan'
        })
      }
      const expiredAt = new Date(request.auth.credentials.exp * 1000)
      await blockedToken.create({ token, expiredAt })
      return h.response('Logout Berhasil').code(200)
    } catch (error) {
      return h.response({
        message: error.message
      })
    }
  }

}

module.exports = userController

// Definisikan model Anda
// ...

const { User } = require('../models')
// eslint-disable-next-line no-unused-vars
const { hash, compare } = require('../helpers/hash')
const  { sign } = require('../helpers/jwt')
const userController = {
  signUp: async (request, h) => {
    try {
      let { name, email, password } = request.payload // mendapatkan name, email, password dari payload
      email = email.toLowerCase() // membuat email menjadi lowercase
      const verifyEmailUser = await User.findOne({ where: { email } }) // verifikasi email apakah email sudah ada atau belum dari database 
      if (verifyEmailUser) {
        return h.response({
          message: 'Email already registered'
        })
      }
      password = hash(password) // password yang didapatkan dijadikasn hash
      const createUser = await User.create({ name, email, password }) // memasukkan name, email, password ke dalam database sebagai pengguna baru, lalu memasukkan datanya ke dalam variabel createUser
      return h.response({
        User: createUser
      }).code(201)
    } catch (error) {
      return h.response({
        message: error.message
      }).code(500)
    }
  },

  login: async (request, h) => {
    try {
      let {password, email} = request.payload
      email = email.toLowerCase()
      const verifyUser = await User.findOne({ where : { email: email}, attributes: ['id','email','password']})
      if(!verifyUser || !compare(password, verifyUser.password)) return h.response({
        message: 'Email tidak terdaftar atau password salah'
      })
      console.log(verifyUser);
      const token = await sign({
        id: verifyUser.id,
        email: verifyUser.email
      })
      return h.response({
        Token: token
      })
    } catch (error) {
        return h.response({
          message: error.message
        }).code(500)
    }
  },

  logout: async (request, h) => {
    try {
      const token = request.headers.authorization.split(' ')[1]
      await remove(token)
      return h.response({
        message: 'Logout berhasil'
      }).code(200)
    } catch (error) {
      return h.response({
        message: error.message
      }).code(500)
    }
  }

}

module.exports = userController

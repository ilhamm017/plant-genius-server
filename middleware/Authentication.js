const { verify } = require('../helpers/jwt')
const Models = require('../models')
const Boom = require('@hapi/boom')

module.exports = {
    Authentication : async (request, h) => {
        try {
          const token = request.headers.authorization; // Mendapatkan token dari headers
          if (!token) {
            throw Boom.unauthorized('Token tidak ditemukan');
          }
          const decodedToken = verify(token); // verify token
          const { id, email } = decodedToken;
          const user = await Models.User.findOne({ where: { id, email } }); // Mengambil data pengguna berdasarkan id dan email
          if (!user) {
            throw Boom.unauthorized('Pengguna tidak ditemukan');
          }
          // Menyimpan informasi pengguna dalam atribut `request.auth.credentials`
          request.auth.credentials = {
            id: user.id,
            email: user.email
          };
          return h.continue;
        } catch (err) {
          throw Boom.unauthorized(err.message);
        }
      }
}
const Joi = require('joi')

const passwordSchema = Joi.string()
  .min(6)
  .max(23)
  .regex(/^(?!.*\s)(?=.*\d)(?=.*[a-zA-Z]).{6,}$/)
  .required()
  .forbidden(/[^\S]/)
  .strict()
  .messages({
    'string.min': 'Password harus memiliki setidaknya {#limit} karakter',
    'string.max': 'Password tidak boleh lebih dari {#limit} karakter',
    'string.pattern.base': 'Password harus mengandung kombinasi huruf dan angka',
    'string.empty': 'Password tidak boleh kosong',
    'any.unknown': 'Password tidak boleh kosong atau mengandung spasi',
    'any.required': 'password tidak boleh kosong'
  })

module.exports = { passwordSchema }

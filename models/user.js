'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nama cannot be empty'
          },
          isAlpha: {
            msg: 'Nama must only contain alphabetic characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Email cannot be omitted'
          },
          notEmpty: {
            msg: 'Email cannot be an empty string'
          },
          isEmail: {
            args: true,
            msg: 'Invalid email format'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password tidak boleh kosong'
          },
          len: {
            args: [6, 23],
            msg: 'Password harus terdiri dari 6 hingga 23 karakter'
          },
          notNull: {
            args: true,
            msg: 'Password tidak boleh kosong'
          },
          is: {
            args: /(?=.*\d)(?=.*[a-zA-Z])/,
            msg: 'Password harus mengandung kombinasi huruf dan angka'
          }
        }
      },      
      no_telepon: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: 'Nomor telepon must only contain numeric characters'
          },
          notEmpty: {
            msg: 'Nomor telepon cannot be empty'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      validate: {
        // checkEmaildanPhone () {
        //   if (!this.email && !this.no_telepon) {
        //     throw new Error('Email atau nomor Telepone harus diisi !!')
        //   }
        // },
        validatePassword () {
          if(!this.password) {
            throw new Error('Password tidak boleh kosong')
          }
        }
      }
    }
  )
  return User
}

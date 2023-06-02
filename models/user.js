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
          validator (value) {
            if (!value) {
              throw new Error('Email tidak boleh kosong')
            }
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
        notEmpty: true,
        validate: {
          validPassword (value) {
            if (!value) {
              throw new Error('password tidak boleh kosong')
            }
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
        checkEmaildanPhone () {
          if (!this.email && !this.no_telepon) {
            throw new Error('Email atau nomor Telepone harus diisi !!')
          }
        }
      }
    }
  )
  return User
}

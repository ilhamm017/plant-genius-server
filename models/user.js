"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "Nama must only contain alphabetic characters",
          },
          notEmpty: {
            msg: "Nama cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email cannot be omitted",
          },
          notEmpty: {
            msg: "Email cannot be an empty string",
          },
          isEmail: {
            args: true,
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          is: {
            args: /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
            msg: "Password must be a combination of letters and numbers with a minimum length of 6 characters",
          },
        },
      },
      no_telepon: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Nomor telepon must only contain numeric characters",
          },
          notEmpty: {
            msg: "Nomor telepon cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

'use strict';
const {
  Model
} = require('sequelize');
const { hashPsw } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Article)
    }
  };
  User.init({
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Username is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Email is required'
        },
        isEmail : {
          msg : 'Email is invalid'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Password is required'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(user) {
        user.password = hashPsw(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { as: 'User'});
    }
  };
  User.init(
     {
        name: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        email: {
           type: DataTypes.STRING,
           unique:true,
           allowNull: false,
        },
        password: {
           type: DataTypes.STRING,
           allowNull: false,
        },
        balance:{
           type:DataTypes.DOUBLE,
            allowNull:true,
        }
     },
     {
        sequelize,
        modelName: 'User',
     }
  );
  return User;
};
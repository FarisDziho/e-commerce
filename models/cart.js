'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.hasMany(models.Item,{
        foreignKey:'id',
      })
      
    }
  };
  Cart.init({
    // userId: DataTypes.INTEGER,
       UserId: {
       type: DataTypes.INTEGER,
      //  allowNull:false,
      //  references:{
      //    model:'Users',
      //    key:'id'
      //  }
     },
     ItemIds: {
       type: DataTypes.ARRAY(DataTypes.INTEGER),
      //  allowNull:true,
      //  references:{
      //    model:'Item',
      //    key:'id'
      //  }
     },
    
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
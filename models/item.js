'use strict';
const {
  Model, BelongsToMany
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsToMany(models.Cart_User, {
         through: 'Cart_Items',
         foreignKey: 'Item_id',
      });
    }
  };
  Item.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    category:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
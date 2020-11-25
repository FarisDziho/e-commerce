'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull:false,
      //   references:{
      //     model:'Users',
      //     key:'id'
      //   }
      // },
      // items: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull:true,
      //   references:{
      //     model:'Item',
      //     key:'id'
      //   }
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  }
};
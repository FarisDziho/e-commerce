'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
       id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
       },
       name: {
          allowNull: false,
          type: Sequelize.STRING,
       },
       password: {
          type: Sequelize.STRING,
          allowNull: false,
       },
       email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true,
       },
       country: {
          type: Sequelize.STRING,
          allowNull: true,
       },
       city: {
          type: Sequelize.STRING,
          allowNull: true,
       },
       zipcode: {
          type: Sequelize.STRING,
          allowNull: true,
       },
       createdAt: {
          allowNull: false,
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
       },
       updatedAt: {
          allowNull: false,
          type: Sequelize.DATE(3),
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
       },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
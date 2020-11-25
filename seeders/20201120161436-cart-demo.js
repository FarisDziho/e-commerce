'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
       await queryInterface.bulkInsert('Carts', [{
          UserId: 1,
          ItemIds:[1,2,3],
          createdAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
          updatedAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {})
  }
};

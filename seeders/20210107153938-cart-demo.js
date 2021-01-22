'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  await queryInterface.bulkInsert('Carts', [{
       id:1,
       UserId:1,
       ItemId:1
     }], {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Carts', null, {});
  }
};

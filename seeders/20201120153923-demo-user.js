'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
       await queryInterface.bulkInsert('Users', [{
          name: 'John Doe',
          email: "johndoe@gmail.com",
          password:"johndoe123",
        }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
       await queryInterface.bulkInsert('Items', [{
          name: "laptop",
          description:"odlican",
          image: "https://www.notebookcheck.net/uploads/tx_nbc2/MicrosoftSurfaceLaptop3-15__1__02.JPG",
          price: 1000.00,
          leftInStock:100,
          createdAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
          updatedAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        {
          name: "watch",
          description:"tacan ko svicarski",
          image: "link",
          price: 500.00,
          leftInStock:10,
          createdAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
          updatedAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
        {
          name: "sir",
          description:"ukusan",
          image: "link",
          price: 10.00,
          leftInStock:300,
          createdAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
          updatedAt:Sequelize.literal('CURRENT_TIMESTAMP(3)'),
        },
      
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
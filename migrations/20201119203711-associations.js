module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Carts', // name of Source model
      'UserId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Carts', // name of Source model
        'ItemIds', // name of the key we're adding 
        {
          type: Sequelize.ARRAY({
            type: Sequelize.INTEGER,
            references: {
              model: 'Items',
              key: 'id',
            }
          }),
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Carts', // name of Source model
      'UserId' // key we want to remove
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Carts', // name of Source model
        'ItemIds' // key we want to remove
      )
    })
  }
};
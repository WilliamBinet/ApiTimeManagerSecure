'use strict';
var modele = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Teams', [
          {
            id_manager: '2',
            name: 'MyOPTeam',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

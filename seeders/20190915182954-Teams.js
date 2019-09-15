'use strict';
var modele = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return modele.Team.findAll().then(T => {
      if (T.length === 0 ){
        return queryInterface.bulkInsert('Teams', [
          {
            id_manager: '2',
            name: 'MyOPTeam',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {});
      } else {
        return queryInterface.showAllTables();
      }
    })
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

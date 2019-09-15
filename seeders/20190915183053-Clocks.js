'use strict';
var modele = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return modele.Clock.findAll().then(T => {
      if (T.length === 0) {
        return queryInterface.bulkInsert('Clocks', [
          {
            id_user: '3',
            time: new Date(),
            status: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id_user: '4',
            time: new Date(),
            status: false,
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ], {});
      } else {
        return queryInterface.showAllTables();
      }
    });
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

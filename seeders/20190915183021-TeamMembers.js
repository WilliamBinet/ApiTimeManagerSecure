'use strict';
const modele = require('../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return modele.TeamMember.findAll().then(T => {
      return queryInterface.bulkInsert('TeamMembers', [
        {
          id_user: '3',
          id_team: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id_user: '4',
          id_team: '1',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
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

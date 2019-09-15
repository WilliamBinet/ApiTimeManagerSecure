'use strict';
var modele = require('../models/index');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let role = modele.Role.findAll();
        if (role.length !== 0) {
            return queryInterface.bulkInsert('Roles', [
                {
                    label: 'Administrator',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    label: 'Manager',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    label: 'Employee',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        } else {
          return queryInterface.bulkInsert('Roles', []);
        }
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

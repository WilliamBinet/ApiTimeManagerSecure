'use strict';
const modele = require('../models/index');

module.exports = {
    up: (queryInterface, Sequelize) => {
          return queryInterface.bulkInsert('WorkingTimes', [
            {
              id_user: '3',
              start: new Date(),
              end: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
            },
            {
              id_user: '4',
              start: new Date(),
              end: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ], {});
        },

        down :
            (queryInterface, Sequelize) => {
                /*
                  Add reverting commands here.
                  Return a promise to correctly handle asynchronicity.

                  Example:
                  return queryInterface.bulkDelete('People', null, {});
                */
            }
    };

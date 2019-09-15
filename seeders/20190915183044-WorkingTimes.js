'use strict';
var modele = require('../models/index');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return modele.WorkingTime.findAll().then (T => {
        if (T.length === 0) {
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
        } else {
          return queryInterface.showAllTables();
        }
      });
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

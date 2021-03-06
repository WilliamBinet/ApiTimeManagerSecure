'use strict';
const modele = require('../models/index');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                email: 'Administrator@email.fr',
                password: '$2b$12$eC5O.uIR87LKsXLCYXA6E.rwptRoKxZrkTRzSok6P5w/yaMToDv.W',
                firstname: 'Administrator',
                lastname: 'LN',
                role: 'Administrator',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'Manager@email.fr',
                password: '$2b$12$eC5O.uIR87LKsXLCYXA6E.rwptRoKxZrkTRzSok6P5w/yaMToDv.W',
                firstname: 'fname',
                lastname: 'LN',
                role: 'Manager',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'Employee1@email.fr',
                password: '$2b$12$eC5O.uIR87LKsXLCYXA6E.rwptRoKxZrkTRzSok6P5w/yaMToDv.W',
                firstname: 'Employee 1',
                lastname: 'LN',
                role: 'Employee',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'Employee2@email.fr',
                password: '$2y$12$ZIVXrHduOT.oAAsmF5i7IOOP0s0Pq3aJ5Do76t..wA3ZViih5H9GG',
                firstname: 'Employee 2',
                lastname: 'LN',
                role: 'Employee',
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

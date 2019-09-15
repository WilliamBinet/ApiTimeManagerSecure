'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'Administrator@email.fr',
        username : 'Administrator',
        password : '$2y$12$ZIVXrHduOT.oAAsmF5i7IOOP0s0Pq3aJ5Do76t..wA3ZViih5H9GG',
        firstname : 'fname',
        lastname : 'lname',
        id_role : '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'Manager@email.fr',
        username : 'Manager',
        password : '$2y$12$ZIVXrHduOT.oAAsmF5i7IOOP0s0Pq3aJ5Do76t..wA3ZViih5H9GG',
        firstname : 'fname',
        lastname : 'lname',
        id_role : '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'Employee1@email.fr',
        username : 'Employee1',
        password : '$2y$12$ZIVXrHduOT.oAAsmF5i7IOOP0s0Pq3aJ5Do76t..wA3ZViih5H9GG',
        firstname : 'fname',
        lastname : 'lname',
        id_role : '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'Employee2@email.fr',
        username : 'Employee2',
        password : '$2y$12$ZIVXrHduOT.oAAsmF5i7IOOP0s0Pq3aJ5Do76t..wA3ZViih5H9GG',
        firstname : 'fname',
        lastname : 'lname',
        id_role : '3',
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

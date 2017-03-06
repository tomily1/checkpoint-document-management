'use strict';
require('dotenv').config();
const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: process.env.ADMIN_EMAIL,
      password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, bcrypt.genSaltSync(10)),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: process.env.USER_EMAIL,
      password:bcrypt.hashSync(process.env.USER_PASSWORD, bcrypt.genSaltSync(10)),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      id: [1, 2]
    });
  }
};
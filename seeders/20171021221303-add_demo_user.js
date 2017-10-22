'use strict'

const {generatePasswordHash} = require('../src/lib/password')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminPasswordHash = await generatePasswordHash('demoadmin')
    const basicPasswordHash = await generatePasswordHash('demobasic')
    const dateNow = new Date()

    const adminUser = {
      name: 'Demo John',
      email: 'john@demo.com',
      password: adminPasswordHash,
      userType: 'admin',
      createdAt: dateNow,
      updatedAt: dateNow
    }

    const basicUser = {
      name: 'Demo Jack',
      email: 'jack@demo.com',
      password: basicPasswordHash,
      userType: 'basic',
      createdAt: dateNow,
      updatedAt: dateNow
    }

    return queryInterface.bulkInsert('user', [adminUser, basicUser], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {})
  }
}

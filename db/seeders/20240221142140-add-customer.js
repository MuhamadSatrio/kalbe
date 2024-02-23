'use strict'
const { customer: Customer } = require('#models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Customer.create({
      txtCustomerEmail: 'customer@gmail.com',
      txtCustomerPassword: 'customer123',
      txtCustomerName: 'Customer',
      txtCustomerAddress: 'Bandar Lampung',
      bitGender: 1,
      dtmBirthDate: '1997-05-26',
      Inserted: new Date()
    })
  },

  async down (queryInterface, Sequelize) {
  }
}

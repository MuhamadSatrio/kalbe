'use strict'
const { produk: Produk } = require('#models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Produk.create(
      {
        txtProductCode: 'P0001',
        txtProductName: 'Prenagen Mommy',
        intQty: 10,
        decPrice: 12000,
        dtInserted: new Date()
      },
      {
        txtProductCode: 'P0002',
        txtProductName: 'Milna',
        intQty: 9,
        decPrice: 8000,
        dtInserted: new Date()
      },
      {
        txtProductCode: 'P0003',
        txtProductName: 'Fitbar',
        intQty: 5,
        decPrice: 5000,
        dtInserted: new Date()
      }
    )
  },

  async down (queryInterface, Sequelize) {
  }
}

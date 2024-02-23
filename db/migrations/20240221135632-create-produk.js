'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produk', {
      intProductID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      txtProductCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      txtProductName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      intQty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      decPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      dtInserted: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('produk')
  }
}

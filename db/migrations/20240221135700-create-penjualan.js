'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('penjualan', {
      intSalesOrderID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      intCustomerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'intCustomerID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      intProductID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'produk',
          key: 'intProductID'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dtSalesOrder: {
        type: Sequelize.DATE,
        allowNull: false
      },
      intQty: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('penjualan')
  }
}

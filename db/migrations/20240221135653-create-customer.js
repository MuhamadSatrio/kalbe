'use strict'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('customer', {
      intCustomerID: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      txtCustomerEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      txtCustomerPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      txtCustomerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      txtCustomerAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      bitGender: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      dtmBirthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      Inserted: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('customer')
  }
}

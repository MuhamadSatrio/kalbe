'use strict'
const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class penjualan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      penjualan.belongsTo(models.customer, { foreignKey: 'intCustomerID' })
      penjualan.belongsTo(models.produk, { foreignKey: 'intProductID' })
    }
  }
  penjualan.init({
    intSalesOrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false,
      autoIncrement: true
    },
    intCustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    intProductID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dtSalesOrder: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    intQty: {
      type: DataTypes.DOUBLE
    }
  }, {
    sequelize,
    modelName: 'penjualan',
    tableName: 'penjualan',
    timestamps: false,
    underscored: false
  })
  return penjualan
}

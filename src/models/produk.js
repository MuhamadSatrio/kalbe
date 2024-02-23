'use strict'
const Sequelize = require('sequelize')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      produk.hasMany(models.penjualan, { foreignKey: 'intProductID' })
    }
  }
  produk.init({
    intProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false,
      autoIncrement: true
    },
    txtProductCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    txtProductName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    intQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    decPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    dtInserted: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'produk',
    tableName: 'produk',
    timestamps: false,
    underscored: false
  })
  return produk
}

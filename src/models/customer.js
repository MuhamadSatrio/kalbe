'use strict'
const Sequelize = require('sequelize')
const { Model } = require('sequelize')
const Nanoid = require('#helpers/Nanoid')
const Bcrypt = require('#helpers/Bcrypt')

module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      customer.hasMany(models.penjualan, { foreignKey: 'intCustomerID' })
    }
  }
  customer.init({
    intCustomerID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        notEmpty: true
      },
      allowNull: false,
      autoIncrement: true
    },
    txtCustomerEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    txtCustomerPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    txtCustomerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    txtCustomerAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bitGender: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dtmBirthDate: {
      type: DataTypes.DATEONLY
    },
    Inserted: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customer',
    timestamps: false,
    underscored: false
  })

  customer.beforeCreate((instance) => {
    if (!instance.txtCustomerPassword) {
      instance.txtCustomerPassword = Bcrypt.hash(Nanoid.get(15))
    }

    instance.txtCustomerPassword = Bcrypt.hash(instance.txtCustomerPassword)
  })
  return customer
}

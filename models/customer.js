'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "customer_id",
        as: "customer"
      })
    }
  };
  customer.init({
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // allowNull: false
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    addres: DataTypes.STRING,
    image: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customer'
  });
  return customer;
};
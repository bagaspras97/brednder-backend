'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    no_invoice: DataTypes.STRING,
    barcode: DataTypes.STRING,
    id_tiket: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_payment: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};
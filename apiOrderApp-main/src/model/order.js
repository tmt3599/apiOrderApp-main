import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Order = sequelizeInstance.define(
  "order",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    userId: {
      type: sequelize.STRING(36),
      allowNull: true,
      field: "userId",
    },
    price: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "price",
    },
    shippingFee: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "shippingFee",
    },
    userVoucherId: {
      type: sequelize.STRING(36),
      allowNull: true,
      field: "userVoucherId",
    },
    quantity: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "quantity",
    },
    total: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "total",
    },
    address: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "address",
    },
    status: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "status",
    },
  },
  {
    tableName: "order",
  }
);

export default Order  ;

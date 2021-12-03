import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const OrderDetail = sequelizeInstance.define(
  "orderDetail",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    orderId: {
      type: sequelize.STRING(36),
      allowNull: true,
      field: "orderId",
    },
    productId: {
      type: sequelize.STRING(36),
      allowNull: true,
      field: "productId",
    },
    quantity: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "quantity",
    },
    size: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "size",
    },
    toppingId: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "toppingId",
    },
    price: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "price",
    },
    total: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "total",
    },
  },
  {
    tableName: "orderDetail",
  }
);

export default OrderDetail;

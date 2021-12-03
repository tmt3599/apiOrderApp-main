import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Product = sequelizeInstance.define(
  "product",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    categoryId: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "categoryId",
    },
    description: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "description",
    },
    imageUrl: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "imageUrl",
    },
    size: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "size",
    },
    price: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "price",
    },
  },
  {
    tableName: "product",
  }
);

export default Product;

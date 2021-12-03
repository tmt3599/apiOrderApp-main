import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const ProductTopping = sequelizeInstance.define(
  "productTopping",
  {
    productId: {
      type: sequelize.STRING(36),
      allowNull: false,
      primaryKey: true,
      field: "productId",
    },
    toppingId: {
      type: sequelize.STRING(36),
      allowNull: false,
      primaryKey: true,
      field: "toppingId",
    },
  },
  {
    tableName: "productTopping",
  }
);

export default ProductTopping;

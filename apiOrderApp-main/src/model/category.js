import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Category = sequelizeInstance.define(
  "category",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "name",
    },
    imageUrl: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "imageUrl",
    },
  },
  {
    tableName: "category",
  }
);

export default Category;

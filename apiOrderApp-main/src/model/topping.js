import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Topping = sequelizeInstance.define(
  "topping",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    title: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "title",
    },
    price: {
      type: sequelize.INTEGER(),
      allowNull: true,
      field: "price",
    },
  },
  {
    tableName: "topping",
  }
);

export default Topping;

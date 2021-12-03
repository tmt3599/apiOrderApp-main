import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const User = sequelizeInstance.define(
  "user",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    firstName: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "firstName",
    },
    lastName: {
      type: sequelize.STRING(),
      allowNull: false,
      field: "lastName",
    },
    phone: {
      type: sequelize.STRING(10),
      allowNull: true,
      field: "phone",
    },
    password: {
      type: sequelize.STRING(255),
      allowNull: true,
      field: "password",
    },
  },
  {
    tableName: "user",
  }
);

export default User;

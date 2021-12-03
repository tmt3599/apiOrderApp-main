import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Store = sequelizeInstance.define(
  "store",
  {
    id: {
      type: sequelize.UUIDV4(36),
      defaultValue: sequelize.UUIDV4(),
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    imageUrl: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "imageUrl",
    },
    name: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "name",
    },
    phone: {
      type: sequelize.STRING(15),
      allowNull: true,
      field: "phone",
    },
    lat: {
      type: sequelize.FLOAT(),
      allowNull: true,
      field: "lat",
    },
    long: {
      type: sequelize.FLOAT(),
      allowNull: true,
      field: "long",
    },
    openTime: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "openTime",
    },
    closeTime: {
      type: sequelize.TIME(),
      allowNull: true,
      field: "closeTime",
    },
    address: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "address",
    },
  },
  {
    tableName: "store",
  }
);

export default Store;

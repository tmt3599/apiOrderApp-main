import sequelize from "sequelize";
import sequelizeInstance from "./index.js";

const Event = sequelizeInstance.define(
  "event",
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
    imageUrl: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "imageUrl",
    },
    detail: {
      type: sequelize.STRING(),
      allowNull: true,
      field: "detail",
    },
    date: {
      type: sequelize.DATE(),
      allowNull: true,
      field: "date",
    },
  },
  {
    tableName: "event",
  }
);

export default Event  ;
